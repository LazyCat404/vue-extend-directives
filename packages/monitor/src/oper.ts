import { inforDispose  } from "./monitor";

// 监控信息
export let operMonitorInfor = new WeakMap()
// 监控实例
export let operMonitorInstance = new WeakMap()

function operClick(){

    // console.log(monitorConfig)
}

// 收集实例
function collectInstance(el:HTMLElement,key:unknown){
    // el.addEventListener('click', operClick);
}

// 销毁实例
function destroyInstance(el:HTMLElement){
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