import { inforDispose, specialNode, startMediaMonitor } from "./monitor";

// 监控信息
export let mediaMonitorInfor = new WeakMap()
// 监控实例
export let mediaMonitorInstance = new WeakMap()

// 收集实例
export function collectInstance(el:HTMLElement,key:unknown){
    // 监控信息
    if(!mediaMonitorInfor.get(el)){
        const nodeName = el.nodeName.toLowerCase()
        const parentName = el.parentNode ? el.parentNode.nodeName.toLowerCase():null
        if(specialNode.includes(nodeName) || (parentName && specialNode.includes(parentName))){
            if(specialNode.includes(nodeName)){
                collectMediaInstance(el,key)
            }else{
                collectMediaInstance(el.parentNode as HTMLElement,key)
            }
        }else{
            console.warn('检测到非媒体组件使用了 v-media，已忽略')
        }
    }
}

// 媒体类实例收集
function collectMediaInstance(el:HTMLElement,key:unknown){
    const nodeName = el.nodeName.toLowerCase()
    // 监控信息
    mediaMonitorInfor.set(el,{
        el,
        key,
        type:'media',
        error:0,        // 数据加载失败
        ended:0,        // 播放结束
        intact:0,       // 完整播放
        rate:[],        // 播放速度
        volume:[],      // 音量
        fragment:[],    // 播放片段（快进时产生）
        path:window.location.href
    })
    // 监控实例
    mediaMonitorInstance.set(el,{
        isRatechange:false, // 防止方法连续调用两遍
        error:()=>{
            mediaError(el)
        },
        ratechange(){
            if(this.isRatechange){
                mediaRatechange(el)
            }else{
                this.isRatechange = true
            }
        },
        volumechange:()=>{
            mediaVolume(el)
        },
        seeked:()=>{
            mediaSeeked(el)
        },
        seeking:()=>{
            mediaSeeking(el)
        },
        ended:()=>{
            mediaEnded(el)
        },

    }) 
    startMediaMonitor()       
}

// 播放结束
function mediaEnded(el:HTMLElement){
    console.log('播放结束')
}
// 加载失败
function mediaError(el:HTMLElement){    
    console.log('加载失败')
}
// 速率改变
function mediaRatechange(el:HTMLElement){
    mediaMonitorInstance.get(el).isRatechange = false 
    console.log('速率改变')
}
// 音量改变
function mediaVolume(el:HTMLElement){
    console.log('音量改变')
}
// 快进/回退
function mediaSeeking(el:HTMLElement){
    console.log('快进/回退')
}
// 快进/回退-结束
function mediaSeeked(el:HTMLElement){
    console.log('快进/回退-结束')
}


// 销毁实例（待修改）
function destroyInstance(el:HTMLElement){
    const destroyInfor = mediaMonitorInfor.get(el)
    const destroyInstance = mediaMonitorInstance.get(el)
    // 信息补全
    destroyInfor.eTime = new Date().getTime()
    if(destroyInfor.rTime.length){
        if(destroyInfor.rTime[destroyInfor.rTime.length - 1].length == 1){
            destroyInfor.rTime[destroyInfor.rTime.length - 1].push(destroyInfor.eTime)
        }
    }
    // 回传监控信息
    inforDispose({...destroyInfor,monitorType:'destroy'})

    // 销毁对应信息实例
    mediaMonitorInfor.delete(el)
    mediaMonitorInstance.delete(el)
}

const media = {
    name: 'media',
    dir: {
        mounted(el: HTMLElement, binding: { value: unknown }): void {
            collectInstance(el,binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            destroyInstance(el)
        }
    }
};

export default media;