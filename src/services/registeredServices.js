import UsersService from "@/services/models/users/users.service";
import PassionsService from "@/services/models/passions/passions.service";
import LocationsService from "@/services/models/locations/locations.service";
import CountriesService from "@/services/models/countries/countries.service";
import TokenService from "@/services/auth/token.service";

export const registeredServices = [
	{
		injectKey: 'usersService',
		service: UsersService
	},
	{
		injectKey: 'passionsService',
		service: PassionsService
	},
	{
		injectKey: 'locationsService',
		service: LocationsService
	},
	{
		injectKey: 'countriesService',
		service: CountriesService
	},
	{
		injectKey: 'tokenService',
		service: TokenService
	}
]