import axios from "axios";

const API_URL = 'http://localhost:8081/';

class CountriesService {
	getCountries() {
		return axios.get(`${API_URL}countries`);
	}
	// в запросы кладем
	// { headers: authHeader() }
}