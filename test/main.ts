import { createApp } from 'vue';
import Index from './Index.vue'
import vueExtendDirectives from '../packages/index';

const app = createApp(Index);

// 自定义指令
app.use(vueExtendDirectives).mount('#app');
