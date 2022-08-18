import { App } from 'vue';
interface dir {
  name: string; // 指令名
  dir: any; // 指令方法
}
interface Module {
  default:dir
}
export const customDirective: dir[] = [];
const modulesFiles = import.meta.glob('./**/index.ts',{ eager: true });

for (const path in modulesFiles) {
  customDirective.push((modulesFiles[path] as Module).default);
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
