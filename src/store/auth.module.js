import AuthService from "@/services/auth/auth.service";
import { getApiErrorText } from "@/services/api";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
	? {status: {loggedIn: true}, user}
	: {status: {loggedIn: false}, user: null};

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({commit}, user) {
			return AuthService.login(user).then(
				user => {
					commit('loginSuccess', user);
					return Promise.resolve(user);
				},
				error => {
					commit('loginFailure');
					return Promise.reject(getApiErrorText(error));
				}
			);
		},
		logout({commit}) {
			AuthService.logout().then(() => {
				commit('logout');
			});
		},
	},

	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true;
			state.user = user;
		},
		loginFailure(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		logout(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
	}
}