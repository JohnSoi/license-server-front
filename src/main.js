import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {router} from './routes';
import Page from "./App";

Vue.config.productionTip = false;


Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    router,
    render: h => h(Page)
}).$mount('#app');