import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";

class CountriesService {
	PATH = '/countries';
	page = 0;
	SIZE = 10;
	MAX_NUMBER_OF_COUNTRIES = 240;

	getPaginatedCountries() {
		return handleResponseWithData(axInst.get(`${ this.PATH }?
		page=${ this.page }&size=${ this.SIZE }&sort=name`)).then((response) => {
			if (this.page < (this.MAX_NUMBER_OF_COUNTRIES / this.SIZE)) {
				++this.page;
			}
			return response;
		});
	}

	getCountriesBySearchString(searchString) {
		return handleResponseWithData(axInst.get(`${ this.PATH }?name=${ searchString }`));
	}
}

export default new CountriesService();