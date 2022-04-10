import { axiosInstance } from "@/services/api";
import TokenService from "@/services/auth/token.service";
import router from "@/router";

const setup = () => {
	axiosInstance.interceptors.request.use(
		config => {
			const publicPages = ['/security/login', '/security/register'];

			if (!publicPages.includes(config.url)) {
				const token = TokenService.getLocalAccessToken();

				if (token) config.headers['x-auth-token'] = token;
			}

			return config;
		}
	);

	axiosInstance.interceptors.response.use(
		config => config,
		error => {
			if (error?.response?.status === 401) {
				router.replace({
					path: '/login'
				})
			}

			return Promise.reject(error);
		}
	);
}

export default setup;