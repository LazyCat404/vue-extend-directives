import { inforDispose, monitorConfig, silenceTime } from "../monitor"

// 观察者（曝光）频率
export const observerConfig:IntersectionObserverInit = {
    threshold:[0, 0.2, 0.4, 0.6, 0.8, 1] 
}

let openSilenceTime = false // 静默时间开启（防止多次调用）

// 曝光回调
export function observerCallback(entries:IntersectionObserverEntry[],instance:WeakMap<any,any>,infor:WeakMap<any,any>){
    const targetInstance = instance.get(entries[0].target)
    const targetInfor = infor.get(entries[0].target)
    const target = entries[0]
    if(target.isIntersecting || !targetInstance.status){
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
        if(monitorConfig.silenceTime && !openSilenceTime){
            // 时间修正
            timeCorrect()
        }
    }else{ 
        // dom 实例被隐藏（未销毁）
        // 信息补全
        if(targetInfor.rTime.length){
            if(targetInfor.rTime[targetInfor.rTime.length - 1].length == 1){
                targetInfor.rTime[targetInfor.rTime.length - 1].push(new Date().getTime())
            }
        }
        if(targetInfor.type == 'page'){
            // 回传监控信息
            inforDispose({...targetInfor,monitorType:'hide'})
        }
    }
}

// 时间修正
export function timeCorrect(){
    window.addEventListener('keypress',timeCorrectCount,true)       // 键盘-敲击
    window.addEventListener('mousemove',timeCorrectCount,true)      // 鼠标-移动
    window.addEventListener('click',timeCorrectCount,true)          // 鼠标-左键
    window.addEventListener('contextmenu',timeCorrectCount,true)    // 鼠标-右键
    window.addEventListener('wheel',timeCorrectCount,true)          // 鼠标-滚轮
    window.addEventListener('timeupdate',timeCorrectCount,true)     // 播放位置改变
    openSilenceTime = true
}

let lastTime = new Date().getTime()
function timeCorrectCount(){
    // console.log('外设操作')
    if(new Date().getTime() - lastTime > monitorConfig.silenceTime * 60 * 1000){
        // 超出静默时间，页面长期未操作
        silenceTime.push([lastTime,new Date().getTime()])
        lastTime = new Date().getTime()
        // console.log('时间存储')
    }else{
        lastTime = new Date().getTime()
        // console.log('时间更新')
    }
}