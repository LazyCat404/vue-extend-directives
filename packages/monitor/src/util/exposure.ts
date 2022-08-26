// 观察者（曝光）频率
export const observerConfig:IntersectionObserverInit = {
    threshold:[0, 0.2, 0.4, 0.6, 0.8, 1] 
}

// 曝光回调
export function observerCallback(entries:IntersectionObserverEntry[],instance:WeakMap<any,any>,infor:WeakMap<any,any>){
    const targetInstance = instance.get(entries[0].target)
    const targetInfor = infor.get(entries[0].target)
    const target = entries[0]
    if(target.intersectionRatio < 0.4){
        if(targetInfor.rTime.length){
            if(targetInfor.rTime[targetInfor.rTime.length -1].length == 1){
                targetInfor.rTime[targetInfor.rTime.length -1].push(new Date().getTime())
            }
        }
    }else if(target.intersectionRatio >= 0.6){
        if(targetInfor.rTime.length){
            if(targetInfor.rTime[targetInfor.rTime.length -1].length == 2){
                targetInfor.rTime.push([new Date().getTime()])
            }
        }else{
            targetInfor.rTime.push([targetInstance.status ? new Date().getTime() : targetInfor.sTime])
        }
    }
    targetInstance.status = true
}