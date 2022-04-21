import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";

class StatisticService {

	PATH = '/statistics';
	PAGE_SIZE = 11;
	page = 0;

	getStatisticByCountries() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/countries
		?page=${ this.page }&size=${ this.PAGE_SIZE }&sort=totalLocationsCount%2Cdesc`))
			.then((response) => {
				if (response.length) {
					++this.page;
				}
				return response;
			});
	}
}

export default new StatisticService();