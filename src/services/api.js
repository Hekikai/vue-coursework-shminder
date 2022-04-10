import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		'Content-Type': 'application/json',
	}
})

export const getApiErrorText = (err) => {
	const error = err?.response?.data?.error;
	const errorMessage = error[0].toUpperCase() + error.slice(1);
	return errorMessage || 'Unknown error';
}