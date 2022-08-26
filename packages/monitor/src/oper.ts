import { observerCallback, observerConfig } from "./util/exposure";
import { inforDispose  } from "./monitor";

// 监控信息
export let operMonitorInfor = new WeakMap()
// 监控实例
export let operMonitorInstance = new WeakMap()

// 收集实例
function collectInstance(el:HTMLElement,key:unknown){
    if(!operMonitorInfor.get(el)){
        // 监控信息
        operMonitorInfor.set(el,{
            el,
            key,
            type:'oper',
            click:0,    // 点击次数
            rTime:[],   // 曝光周期
            sTime:new Date().getTime(), //  开始时间
            eTime:null,  // 结束时间
            url:window.location.href
        })
        // 监控实例
        operMonitorInstance.set(el,{
            observer:new IntersectionObserver((entries:IntersectionObserverEntry[])=>{
                observerCallback(entries,operMonitorInstance,operMonitorInfor)
            }, observerConfig),
            click:()=>{
                clickMonitor(el)
            },
            status:false
        })  
        operMonitorInstance.get(el).observer.observe(el);
    }
}

// click 监听事件
function clickMonitor(el:HTMLElement){
    // TODO:若点击即销毁，则无法执行
    const monitorInfor = operMonitorInfor.get(el);
    monitorInfor.click++;
    // 回传监控信息
    inforDispose({...monitorInfor,monitorType:'click'})
}

// 销毁实例
function destroyInstance(el:HTMLElement){
    const destroyInfor = operMonitorInfor.get(el)
    const destroyInstance = operMonitorInstance.get(el)
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
    operMonitorInfor.delete(el)
    operMonitorInstance.delete(el)
}

const oper = {
    name: 'oper',
    dir: {
        mounted(el: HTMLElement, binding: { value: unknown }): void {
            collectInstance(el,binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            destroyInstance(el)
        }
    }
};

export default oper;