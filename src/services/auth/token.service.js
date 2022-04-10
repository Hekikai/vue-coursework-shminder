class TokenService {
	ACCESS_TOKEN = 'access_token'

	getLocalAccessToken() {
		return localStorage.getItem(this.ACCESS_TOKEN)
	}

	updateLocalAccessToken(token) {
		localStorage.setItem(this.ACCESS_TOKEN, token);
	}

	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	setUser(user) {
		localStorage.setItem('user', JSON.stringify(user));
	}
}

export default new TokenService();