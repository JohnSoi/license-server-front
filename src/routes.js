import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld, name: 'home'},
    {path: '*', redirect: '/'}
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['login'];
    const currentPage = to.name || to.path.replace('/', '');
    const authRequired = !publicPages.includes(currentPage);
    const loggedIn = true;

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if(to.name === 'login' && loggedIn){
        return next('/');
    }

    next();
});

export {router};