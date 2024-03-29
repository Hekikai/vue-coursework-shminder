import { createWebHistory, createRouter } from "vue-router";
import TheLogin from "@/pages/authorization/TheLoginPage";
import TheMain from '@/pages/main/TheMain';
import ProfilePageWrapper from "@/pages/main/profile/ProfilePageWrapper";
import ProfilePage from "@/pages/main/profile/ProfilePage";
import TheRegistrationPage from "@/pages/registration/TheRegistrationPage";
import TheStatisticPage from "@/pages/statistic/StatisticPage";
import StatisticPageWrapper from "@/pages/statistic/StatisticPageWrapper";
import HomePageWrapper from "@/pages/home/HomePageWrapper";
import HomePage from "@/pages/home/HomePage";

const routes = [
	{
		path: '/',
		redirect: {
			name: 'TheLogin'
		}
	},
	{
		name: 'TheLogin',
		path: '/vue-coursework-shminder/login',
		component: TheLogin
	},
	{
		name: 'TheRegistrationPage',
		path: '/vue-coursework-shminder/registration',
		component: TheRegistrationPage
	},
	{
		name: 'TheMain',
		path: '/vue-coursework-shminder/main',
		component: TheMain,
		children: [
			{
				path: 'home',
				component: HomePageWrapper,
				children: [
					{
						name: 'home',
						path: '',
						component: HomePage
					}
				]
			},

			{
				path: 'profile',
				component: ProfilePageWrapper,
				children: [
					{
						name: 'profile',
						path: '',
						component: ProfilePage
					},
				]
			},
			{
				path: 'statistic',
				component: StatisticPageWrapper,
				children: [
					{
						name: 'statistic',
						path: '',
						component: TheStatisticPage
					},
				]
			}
		]
	},

]

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const publicPages = ['/vue-coursework-shminder/login', '/vue-coursework-shminder/registration'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		next('/vue-coursework-shminder/login');
	} else {
		next();
	}
})


export default router;