let monitorConfig = {
    usable:false,
    callBack:(par:unknown)=>{}
}

// 信息处理
export function inforDispose(par:unknown){
    if(monitorConfig.usable){
        monitorConfig.callBack(par)
    }
}

// 构建监控核心
function monitorCore(callBack:any){
    if(callBack && !monitorConfig.usable){
        if(typeof(callBack) == 'function'){
            monitorConfig = {
                callBack,
                usable:true
            }
        }else{
            console.error('指令 v-monitor 的参数必须是 function')
        }
    }else{
        console.warn('指令 v-monitor 未设置参数方法')
    } 
}

const monitor = {
    name: 'monitor',
    dir: {
        mounted(el: HTMLElement, binding: { value: any }): void {
            monitorCore(binding.value)
        },
        beforeUnmount(el: HTMLElement): void {
            
        }
    }
};

export default monitor;