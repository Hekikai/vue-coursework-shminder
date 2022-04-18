import {
	handleResponseWithData,
	handleResponseWithoutData,
	axiosInstance as axInst
} from "@/services/api";

class PassionsService {
	PATH = '/passions';

	getAllPassions() {
		return handleResponseWithData(axInst.get(`${ this.PATH }`));
	}
}

export default new PassionsService();