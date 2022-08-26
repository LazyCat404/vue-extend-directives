import { observerCallback, observerConfig } from "./util/exposure";
import { inforDispose } from "./monitor";

// 监控信息
export let pageMonitorInfor = new WeakMap()
// 监控实例
export let pageMonitorInstance = new WeakMap()

// 收集实例
function collectInstance(el:HTMLElement,key:unknown){
    // 监控信息
    pageMonitorInfor.set(el,{
        el,
        key,
        type:'page',
        rTime:[],   // 曝光周期
        sTime:new Date().getTime(), //  开始时间
        eTime:null,  // 结束时间,
        path:window.location.href
    })
    // 监控实例
    pageMonitorInstance.set(el,{
        observer:new IntersectionObserver((entries:IntersectionObserverEntry[])=>{
            observerCallback(entries,pageMonitorInstance,pageMonitorInfor)
        }, observerConfig),
        status:false
    })  
    pageMonitorInstance.get(el).observer.observe(el);
}

// 销毁实例
function destroyInstance(el:HTMLElement){
    const destroyInfor = pageMonitorInfor.get(el)
    const destroyInstance = pageMonitorInstance.get(el)
    // 信息补全
    destroyInfor.eTime = new Date().getTime()
    if(destroyInfor.rTime.length){
        if(destroyInfor.rTime[destroyInfor.rTime.length - 1].length == 1){
            destroyInfor.rTime[destroyInfor.rTime.length - 1].push(destroyInfor.eTime)
        }
    }
    // 回传监控信息
    inforDispose({...destroyInfor,monitorType:'destroy'})
    // 解除监听
    destroyInstance.observer.unobserve(el)
    destroyInstance.observer.disconnect(el)
    // 销毁对应信息实例
    pageMonitorInfor.delete(el)
    pageMonitorInstance.delete(el)
}

const page = {
    name: 'page',
    dir: {
        mounted(el: HTMLElement, binding: { value: unknown }): void {
            collectInstance(el,binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            destroyInstance(el)
        }
    }
};

export default page;