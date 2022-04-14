import {
	handleResponseWithData,
	handleResponseWithoutData,
	axiosInstance as axInst
} from "@/services/api";

class BaseService {
	PATH = '';

	get(id) {
		return handleResponseWithData(axInst.get(`${this.PATH}/${id}`));
	}
}