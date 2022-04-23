import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";

class StatisticService {

	PATH = '/statistics';
	PAGE_SIZE = 11;
	page = 0;

	checkResponseLength = (response) => {
		if (response.length) {
			++this.page;
		}
		return response;
	}

	getStatisticByCountries() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/countries
		?page=${ this.page }&size=${ this.PAGE_SIZE }&sort=totalLocationsCount%2Cdesc`)).then(this.checkResponseLength)
	}

	getStatisticByCountryPassions() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/countries/passions/all
		?page=${ this.page }&size=${ this.PAGE_SIZE }`)).then(this.checkResponseLength)
	}

	getStatisticByLocations() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/locations
		?page=${ this.page }&size=${ this.PAGE_SIZE }&sort=totalUsersCount%2Cdesc`)).then(this.checkResponseLength)
	}

	getStatisticByPassions() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/passions
		?page=${ this.page }&size=${ this.PAGE_SIZE }&sort=totalUsersCount%2Cdesc`)).then(this.checkResponseLength)
	}


	getStatisticByMaxPassions() {
		return handleResponseWithData(axInst.get(`${ this.PATH }/countries/passions/max
		?page=${ this.page }&size=${ this.PAGE_SIZE }`)).then(this.checkResponseLength)
	}

}

export default StatisticService;