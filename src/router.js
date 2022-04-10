import {createWebHistory, createRouter} from "vue-router";
import TheLogin from "@/components/TheLogin";
import TheProfile from "@/components/TheProfile";

const routes = [
	{
		path: '/profile',
		name: 'TheProfile',
		component: TheProfile
	},
	{
		path: '/login',
		name: 'TheLogin',
		component: TheLogin
	},

]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;