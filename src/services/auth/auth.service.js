import { axiosInstance } from "@/services/api";
import TokenService from "@/services/auth/token.service.js";

class AuthService {
	AUTH_TOKEN_HEADER = 'x-auth-token';

	login(credentials) {
		return axiosInstance.post('/security/login', credentials).then(
			response => {
				TokenService.setUser(response.data);
				TokenService.updateLocalAccessToken(response.headers[this.AUTH_TOKEN_HEADER]);

				return Promise.resolve(response.data);
			}
		)
	}

	logout() {
		return axiosInstance.post('/security/logout', {
			headers: {
				token: TokenService.getLocalAccessToken()
			}
		}).then(() => {
				localStorage.removeItem('user');
			},
			error => {
				console.log(error)
			})
	}

	register(credentials) {
		return axiosInstance.post('/users/registration', credentials).then(
			response => {
				TokenService.setUser(response.data);
				TokenService.updateLocalAccessToken(response.headers[this.AUTH_TOKEN_HEADER]);

				return Promise.resolve(response.data);
			}
		)
	}
}

export default new AuthService();