import {createRouter, createWebHistory} from 'vue-router';
import Layout from '@/Layout/index.vue';
import Entry from '@/views/entry/index.vue';
import Exchange from '@/views/exchange/index.vue';
import Login from '@/views/login/index.vue';
import Ucenter from '@/views/ucenter/index.vue';
import Reg from '@/views/reg/index.vue';

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'index',
                component: Entry,
            },
            {
                path: 'exchange/:pair',
                name: 'Exchange',
                component: Exchange,
            },
            {
                path: 'login',
                name: 'Login',
                component: Login,
            },
            {
                path: 'reg',
                name: 'Reg',
                component: Reg,
            },
            {
                path: 'ucenter',
                name: 'Ucenter',
                component: Ucenter,
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;