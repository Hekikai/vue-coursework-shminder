import UsersService from "@/services/models/users/users.service";
import PassionsService from "@/services/models/passions/passions.service";

export const registeredServices = [
	{
		injectKey: 'usersService',
		service: UsersService
	},
	{
		injectKey: 'passionsService',
		service: PassionsService
	}
]