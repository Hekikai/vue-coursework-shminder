import {
	axiosInstance as axInst,
	handleResponseWithData
} from "@/services/api";

class UsersService {
	PATH = '/users';

	getMyData() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/me`));
	}

	registerUser(dto) {
		return handleResponseWithData(axInst.post(`${ this.PATH }/registration`, dto));
	}

	getUsers(genderToSearch) {
		return handleResponseWithData(axInst.get(`${ this.PATH }/`, {
			params: {
				gender: genderToSearch
			}
		}));
	}

	likeUser(id) {
		return handleResponseWithData(axInst.post(`${ this.PATH }/likes`, {
			victimId: id
		}))
	}

	unlikeUser(id) {
		return handleResponseWithData(axInst.delete(`${ this.PATH }/likes`, {
			data: {
				victimId: id
			}
		}))
	}

	getLikedUsers() {
		return handleResponseWithData(axInst.get(`${this.PATH}/likes/from`));
	}

}

export default new UsersService();