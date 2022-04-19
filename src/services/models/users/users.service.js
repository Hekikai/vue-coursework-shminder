import {
	axiosInstance as axInst,
	handleResponseWithData
} from "@/services/api";

class UsersService {
	PATH = '/users';

	getMyData() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/me`));
	}

	getMyProfileImage() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/images`, {
			headers: {
				accept: "image/jpeg"
			}
		}));
	}

	registerUser(dto) {
		return handleResponseWithData(axInst.post(`${this.PATH}/registration`, dto));
	}

}

export default new UsersService();