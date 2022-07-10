import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './style/platformStyle.less'

const application = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    application.component(key, component);
}

application.use(ElementPlus).use(store).use(router);

application.mount('#app');
