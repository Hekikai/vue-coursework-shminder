import '../src/styles/global.scss';

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import naive from 'naive-ui';
import axios from "axios";
import VueAxios from "vue-axios";

import setupInterceptors from "@/services/setupInterceptors";

setupInterceptors();
const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.use(router);
app.use(naive);
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app');
