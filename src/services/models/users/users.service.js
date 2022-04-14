import {
	axiosInstance as axInst,
	handleResponseWithData
} from "@/services/api";

class UsersService {
	PATH = '/users';

	getMyData() {
		return handleResponseWithData(axInst.get(`${this.PATH}/me`));
	}
}

export default new UsersService();