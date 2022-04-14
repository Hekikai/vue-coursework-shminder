import { createWebHistory, createRouter } from "vue-router";
import TheLogin from "@/pages/authorization/TheLoginPage";
import TheMain from '@/pages/main/TheMain';
import ProfileWrapper from "@/pages/main/profile/ProfileWrapper";
import ProfilePage from "@/pages/main/profile/ProfilePage";
import TheRegistrationPage from "@/pages/registration/TheRegistrationPage";

const routes = [
	{
		path: '/',
		redirect: {
			name: 'TheLogin'
		}
	},
	{
		name: 'TheLogin',
		path: '/login',
		component: TheLogin
	},
	{
		name: 'TheRegistrationPage',
		path: '/registration',
		component: TheRegistrationPage
	},
	{
		name: 'TheMain',
		path: '/main',
		component: TheMain,
		children: [
			{
				path: 'profile',
				component: ProfileWrapper,
				children: [
					{
						name: 'profile',
						path: '',
						component: ProfilePage
					}
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
	const publicPages = ['/login', '/register'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		next('/login');
	} else {
		next();
	}
})


export default router;