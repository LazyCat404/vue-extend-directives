import { createApp, DirectiveBinding, Component, ComponentPublicInstance } from 'vue';
import ContextMenu from './ContextMenu.vue';
let menuWrapper: HTMLElement | null;
// 右键点击
function rightClick(event: MouseEvent, binding: DirectiveBinding) {
  event.preventDefault(); // 阻止默认事件
  removeWrapper();
  // 菜单容器，用于定位
  menuWrapper = document.createElement('div');
  menuWrapper.setAttribute('style', `position: fixed;left:${event.clientX}px;top:${event.clientY}px;`);
  contextMenuRender(binding);
  document.body.appendChild(menuWrapper);
}
function contextMenuRender(binding: DirectiveBinding): void {
  if (binding.value) {
    customContextMenu(binding.value);
  } else {
    console.log(1);
  }
}
export interface contextMenuList {
  label: string; // 标题
  click?: object; // 点击事件
  divid?: true; // 分割线
  disable?: boolean; // 是否禁用
  ico?: string; // 图标：图片地址
  sub?: string; //副标题
  children?: [
    // 子菜单
    {
      label: string;
      click?: object;
      disable?: boolean;
    }
  ];
}
export interface contextMenuProps {
  renderList: Array<unknown>;
}

/**
 * 自定义渲染
 * @param contextmenuRef 单文件组件实例、对象数组
 */
function customContextMenu(contextmenuRef: Component | Array<contextMenuList>): void {
  if (Object.prototype.toString.call(contextmenuRef) === '[object Array]') {
    customArrayMenu(contextmenuRef as Array<contextMenuList>);
  } else {
    createApp(contextmenuRef).mount(menuWrapper as HTMLElement);
  }
  clickListener();
}
/**
 * 自定义数组菜单
 * @param contextmenuRef 对象数组
 */
function customArrayMenu(contextmenuRef: Array<contextMenuList>) {
  const contextMenuInstance: ComponentPublicInstance = createApp(ContextMenu).mount(menuWrapper as HTMLElement);
  // 数组清空
  (contextMenuInstance.$props as contextMenuProps).renderList.splice(
    0,
    (contextMenuInstance.$props as contextMenuProps).renderList.length
  );
  // 填充数组菜单
  contextmenuRef.forEach(item => {
    (contextMenuInstance.$props as contextMenuProps).renderList.push(item);
  });
  // 执行渲染
  (contextMenuInstance as any).initRender();
}

function clickListener() {
  window.addEventListener('click', removeWrapper);
}

// 移除菜单
function removeWrapper() {
  if (menuWrapper) {
    document.body.removeChild(menuWrapper);
    menuWrapper = null;
  }
}
// 初始绑定
function bind(el: any, binding: DirectiveBinding): void {
  el._bindRightClick = (event: MouseEvent) => {
    rightClick(event, binding);
  };
  el.addEventListener('contextmenu', el._bindRightClick);
}

const contextmenu = {
  name: 'contextmenu',
  dir: {
    mounted: bind,
    beforeUnmount(el: any): void {
      removeWrapper();
      el.removeEventListener('contextmenu', el._bindRightClick);
      window.removeEventListener('click', removeWrapper);
    }
  }
};

export default contextmenu;
