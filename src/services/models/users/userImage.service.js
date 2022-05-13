import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";
import { Buffer } from 'safe-buffer';


class UserImageService {
	PATH = '/users/images';

	async getUserImage(id) {
		try {
			const config = {
				responseType: 'arraybuffer'
			}

			const response = await axInst.get(`${ this.PATH }?userId=${ id }`, config);
			const MIMEType = response.headers['content-type'];

			const buffer = Buffer.from(response.data, 'binary').toString('base64');

			return Promise.resolve(`data:${ MIMEType };base64,` + buffer);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async update(file, params = {}) {
		const formData = new FormData();
		formData.append('image', file);

		return handleResponseWithData(axInst.post(`${ this.PATH }?userId=${ id }`, formData, {params}));
	}
}

export default new UserImageService();