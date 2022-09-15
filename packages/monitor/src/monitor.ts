import { mediaMonitorInstance } from "./media"
import { operMonitorInstance } from "./oper"

let isStartMediaMonitor = false // 是否开启媒体监听
let isStartOperMonitor = false // 是否开启操作监听
export let silenceTime:any[] = []
// 音频、视频、动画相关标签
export const specialNode =  [
    'svg',
    'canvas',
    'audio',
    'video',
]

export let monitorConfig = {
    useAble:false,
    silenceTime:0,   // 静默时间（可扩展为自定义，单位：分钟）
    callBack:(par:unknown)=>{}
}

// 信息处理
export function inforDispose(par:any){
    if(monitorConfig.useAble){
        if(monitorConfig.silenceTime){
            monitorConfig.callBack({...par,silenceTime})
        }else{
            monitorConfig.callBack(par)
        }
    }else{
        console.warn('请检查是否注册 v-monitor')
    }
}

// 构建监控核心
function monitorCore(callBack:any){
    if(callBack && !monitorConfig.useAble){
        if(typeof(callBack) == 'function'){
            monitorConfig = {
                callBack,   // 回调函数
                silenceTime:0,
                useAble:true    // 监控可用
            }
        }else{
            console.error('指令 v-monitor 的参数必须是 function')
        }
    }else{
        console.warn('指令 v-monitor 未设置参数方法')
    } 
}
// 启动媒体监听（不包括动画）
export function startMediaMonitor(){
    if(!isStartMediaMonitor){
        // 仅开启一次
        window.addEventListener('error',monitorListener,true)
        window.addEventListener('ended',monitorListener,true)
        isStartMediaMonitor = true
    }
}

// 启动操作监听
export function startOperMonitor(){
    if(!isStartOperMonitor){
        window.addEventListener('click',monitorListener,true)
        isStartOperMonitor = true
    }
}

// 监听回调事件
function monitorListener(el:Event){
    el = el || window.event
    if(el.target){
        const nodeName = (el.target as any ).nodeName.toLowerCase()
        const parentName = (el.target as any ).parentNode ? (el.target as any ).parentNode.nodeName.toLowerCase() : null 
        if(specialNode.includes(nodeName) || (parentName && specialNode.includes(parentName))){
            // 媒体监听
            if(specialNode.includes(nodeName)){
                if(mediaMonitorInstance.get(el.target)){
                    mediaMonitorInstance.get(el.target)[el.type]()
                }
            }else{
                if(mediaMonitorInstance.get((el.target as any ).parentNode)){
                    mediaMonitorInstance.get((el.target as any ).parentNode)[el.type]()
                }
            }
        }else{  
            // （鼠标）操作监听
            if(operMonitorInstance.get(el.target)){
                operMonitorInstance.get(el.target)[el.type]()
            }
        }  
    }else{
        console.error('未检测倒合适 dom，请检查后重新挂载')
    }
}

// 配置重置
function resetConfig(){
    // 信息重置，避免误将 v-monitor 卸载
    isStartMediaMonitor = false // 是否开启媒体监听
    isStartOperMonitor = false // 是否开启操作监听
    silenceTime = []
    monitorConfig = {
        useAble:false,
        silenceTime:0,   // 静默时间（可扩展为自定义，单位：分钟）
        callBack:(par:unknown)=>{}
    }
}

const monitor = {
    name: 'monitor',
    dir: {
        mounted(el: HTMLElement, binding: { value: any }): void {
            monitorCore(binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            // 解除监听
            window.removeEventListener('click',monitorListener)
            window.removeEventListener('error',monitorListener)
            window.removeEventListener('ended',monitorListener)
            resetConfig()
        }
    }
};

export default monitor;