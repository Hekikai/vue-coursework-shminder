import { createWebHistory, createRouter } from "vue-router";
import TheLogin from "@/pages/authorization/TheLoginPage";
import TheMain from '@/pages/main/TheMain';
import ProfileWrapper from "@/pages/main/profile/ProfilePageWrapper";
import ProfilePage from "@/pages/main/profile/ProfilePage";
import TheRegistrationPage from "@/pages/registration/TheRegistrationPage";
import TheStatisticPage from "@/pages/statistic/StatisticPage";
import StatisticPageWrapper from "@/pages/statistic/StatisticPageWrapper";

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
				path: 'Profile',
				component: ProfileWrapper,
				children: [
					{
						name: 'Profile',
						path: '',
						component: ProfilePage
					},
				]
			},
			{
				path: 'Statistic',
				component: StatisticPageWrapper,
				children: [
					{
						name: 'Statistic',
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