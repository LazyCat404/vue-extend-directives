import { inforDispose, specialNode, startMediaMonitor } from "./monitor";

// 监控信息
export let mediaMonitorInfor = new WeakMap()
// 监控实例
export let mediaMonitorInstance = new WeakMap()

// 收集实例
export function collectInstance(el:HTMLAudioElement,key:unknown){
    // 监控信息
    if(!mediaMonitorInfor.get(el)){
        const nodeName = el.nodeName.toLowerCase()
        const parentName = el.parentNode ? el.parentNode.nodeName.toLowerCase():null
        if(specialNode.includes(nodeName) || (parentName && specialNode.includes(parentName))){
            if(specialNode.includes(nodeName)){
                collectMediaInstance(el,key)
            }else{
                collectMediaInstance(el.parentNode as HTMLAudioElement,key)
            }
        }else{
            console.warn('检测到非媒体组件使用了 v-media，已忽略')
        }
    }
}

// 媒体监控相关设置
const mediaMonitorConfig = {
    intactRate:0.9,   // 完播率(1-0)
}

// 媒体类实例收集
function collectMediaInstance(el:HTMLElement|HTMLAudioElement,key:unknown){
    const nodeName = el.nodeName.toLowerCase()
    const parentName = el.parentNode ? el.parentNode.nodeName.toLowerCase():null
    if(specialNode.includes(nodeName) || (parentName && specialNode.includes(parentName))){
        // 挂载点判断
        if(!specialNode.includes(nodeName)&& (parentName && specialNode.includes(parentName))){
            el =  el.parentNode as HTMLAudioElement
        }
        // 监控信息
        if(!mediaMonitorInfor.get(el)){
            // 监控信息
            mediaMonitorInfor.set(el,{
                el,
                key,
                type:'media',
                error:0,        // 数据加载失败
                intact:0,       // 完整播放
                path:window.location.href
            })
            // 监控实例
            mediaMonitorInstance.set(el,{
                error:()=>{
                    mediaError(el as HTMLAudioElement)
                },
                ended:()=>{
                    mediaEnded(el as HTMLAudioElement)
                },
            }) 
            startMediaMonitor()  
        }  
    }
   
}

// 播放结束
function mediaEnded(el:HTMLAudioElement){
    intactCompute(el)
}
// 加载失败
function mediaError(el:HTMLAudioElement){    
    mediaMonitorInfor.get(el).error++ 
}

// 完整播放计算
function intactCompute(el:HTMLAudioElement){
    // 完播率计算
    let played = el.played        // TimeRanges
    let duration = el.duration    // 媒体总长度
    // 输出片段
    if(played.length){
        let playedTime = 0  // 已播时常
        for(let i = 0; i < played.length; i++){
            playedTime = playedTime + (played.end(i) - played.start(i))
        }
        if(playedTime > duration * mediaMonitorConfig.intactRate || playedTime == duration * mediaMonitorConfig.intactRate ){
            mediaMonitorInfor.get(el).intact++
        }
    }
}

// 销毁实例
function destroyInstance(el:HTMLAudioElement){
    const destroyInfor = mediaMonitorInfor.get(el)
    const destroyInstance = mediaMonitorInstance.get(el)
    // 信息补全
    destroyInfor.eTime = new Date().getTime()
    // 回传监控信息
    inforDispose({...destroyInfor,monitorType:'destroy'})

    // 销毁对应信息实例
    mediaMonitorInfor.delete(el)
    mediaMonitorInstance.delete(el)
}

const media = {
    name: 'media',
    dir: {
        mounted(el: HTMLAudioElement, binding: { value: unknown }): void {
            collectInstance(el,binding.value)
        },
        beforeUnmount(el: HTMLAudioElement): void {
            destroyInstance(el)
        }
    }
};

export default media;