import { produceAge } from "@/utils/produceAge";

export const produceCardTitle = (user) => {
	return `${user.firstName} ${user.middleName || ''} ${user.lastName}, ${produceAge(user.dateOfBirth)}`
}