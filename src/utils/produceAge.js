export const produceAge = (usersAge) => {
	return new Date().getFullYear() - new Date(usersAge).getFullYear()
}