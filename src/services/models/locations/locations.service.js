import {
	handleResponseWithData,
	axiosInstance as axInst
} from "@/services/api";

class LocationsService {
	PATH = '/locations';
	SIZE = 20;
	COUNTRY_NAME = '';

	getLocationsByCountryName(country) {
		this.COUNTRY_NAME = country;
		return handleResponseWithData(axInst.get(`${ this.PATH }?
		countryName=${ country }&size=${ this.SIZE }`));
	}

	getLocationsBySearchString(searchString) {
		return handleResponseWithData(axInst.get(`${ this.PATH }?
		countryName=${ this.COUNTRY_NAME }&search=${ searchString }&size=${ this.SIZE }`));
	}
}

export default new LocationsService();