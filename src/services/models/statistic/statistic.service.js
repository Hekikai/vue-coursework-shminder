import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";

class StatisticService {

	PATH = '/statistics';

	getStatisticByCountries() {
		return handleResponseWithData(axInst.get(`${this.PATH}/countries`));
	}
}

export default new StatisticService();