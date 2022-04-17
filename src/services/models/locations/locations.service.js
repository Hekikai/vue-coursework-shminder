import { handleResponseWithData, axiosInstance as axInst } from "@/services/api";

class LocationsService {
	PATH = '/locations';

	getLocationsBySearchString(searchString) {
		return handleResponseWithData(axInst.get(`${this.PATH}?countryName=${searchString}`));
	}

}

export default new LocationsService();