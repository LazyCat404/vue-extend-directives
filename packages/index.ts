import { App } from 'vue';
interface dir {
  name: string; // 指令名
  dir: any; // 指令方法
}
export const customDirective: dir[] = [];
const modulesFiles = import.meta.globEager('./**/index.ts');
for (const path in modulesFiles) {
  customDirective.push(modulesFiles[path].default);
}

// 指令注册
const vueExtendDirectives = {
  install(app: App) {
    customDirective.map((directive: dir) => {
      app.directive(`${directive.name}`, directive.dir);
    });
  }
};

export default vueExtendDirectives;
