import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		'Content-Type': 'application/json',
	}
})

export const getApiErrorText = (error) => {
	return error?.response?.data?.error || 'Unknown error';
}