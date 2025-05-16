function inputListener(event:any){
  // 获取输入值
  let value = event.target.value;
  // 只允许输入数字
  if (!/^[1-9]\d*$/.test(value)) {
    event.target.value = value.replace(/\D/g, ''); // 移除非数字字符
  }
}
// 绑定监听
function bindListener(el:HTMLElement){
  el.addEventListener('input',inputListener);
}

const int = {
  name: 'int',
  dir: {
    mounted(el: HTMLElement): void {
      bindListener(el)
    },
    beforeUnmount(el: HTMLElement): void {
      el.removeEventListener('click', inputListener);
    }
  }
};


export default int;