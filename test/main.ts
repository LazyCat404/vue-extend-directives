// 组件渲染文件
import { createApp } from 'vue';
import arrayMenu from './contextmenu/array-menu.vue';
import hide from './hide/hide.vue';
import extendDirect from '../packages/index';

const app = createApp(arrayMenu);
// 自定义指令

app.use(extendDirect).mount('#app');
