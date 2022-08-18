function elFocus(el:HTMLElement){
    if(el.nodeName === 'INPUT'){
        el.focus()
    }else{
        let childInput =  el.querySelectorAll('input')
        if(childInput.length){
            // 子节点内最后一个 input 
            childInput[childInput.length -1].focus()
        } 
    }
}

const focus = {
    name: 'focus',
    dir: {
        mounted(el: HTMLElement, binding: { value: unknown }): void {
            elFocus(el)
        },
    }
};
export default focus;