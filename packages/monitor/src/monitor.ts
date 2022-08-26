import { operMonitorInstance } from "./oper"

export let monitorConfig = {
    useAble:false,
    callBack:(par:unknown)=>{}
}

// 信息处理
export function inforDispose(par:unknown){
    if(monitorConfig.useAble){
        monitorConfig.callBack(par)
    }
}

// 构建监控核心
function monitorCore(callBack:any){
    if(callBack && !monitorConfig.useAble){
        if(typeof(callBack) == 'function'){
            monitorConfig = {
                callBack,   // 回调函数
                useAble:true    // 监控可用
            }
            window.addEventListener('click',monitorListener)
        }else{
            console.error('指令 v-monitor 的参数必须是 function')
        }
    }else{
        console.warn('指令 v-monitor 未设置参数方法')
    } 
}

// 监听事件
function monitorListener(el:Event){
    if(el.target){
        if(operMonitorInstance.get(el.target)){
            operMonitorInstance.get(el.target)[el.type]()
        }
    }
}

const monitor = {
    name: 'monitor',
    dir: {
        mounted(el: HTMLElement, binding: { value: any }): void {
            monitorCore(binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            //  解除监听
            window.removeEventListener('click',monitorListener)
        }
    }
};

export default monitor;