import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://192.168.0.196:8080",
	headers: {
		'Content-Type': 'application/json',
	}
})

export const getApiErrorText = (err) => {
	const error = err?.response?.data?.error;
	const errorMessage = error[0].toUpperCase() + error.slice(1);
	return errorMessage || 'Unknown error';
}

export const handleResponseWithData = (promise) => {
	return promise.then(
		response => Promise.resolve(response.data),
		error => Promise.reject(getApiErrorText(error))
	);
}

export const handleResponseWithoutData = (promise) => {
	return promise.then(
		response => Promise.resolve(response),
		error => Promise.reject(getApiErrorText(error))
	);
}