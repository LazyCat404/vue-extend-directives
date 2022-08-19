import { App } from 'vue';
interface dir {
  name: string; // 指令名
  dir: any; // 指令方法
}

export const customDirective: dir[] = [];
const modulesFiles = import.meta.glob('./**/index.ts',{ eager: true });
for (const path in modulesFiles) {
  const dirInstance =  modulesFiles[path] as any
  if(dirInstance.default){
    customDirective.push(dirInstance.default);
  }else{
    for(const mode in dirInstance){
      customDirective.push(dirInstance[mode])
    }
  }
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
