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
}

export default new UsersService();