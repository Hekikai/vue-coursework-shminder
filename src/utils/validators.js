export const validatedValue = (paramToValidate, action = 'input') => ({
	required: true,
	trigger: ["blur", "input"],
	message: `Please, ${ action } your ${ paramToValidate }`
})

export const validateDateOfBirth = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				const userYear = new Date(value).getFullYear();
				const currentYear = new Date().getFullYear();
				if (!value) {
					return new Error("Date of birth is required!");
				} else if (currentYear - userYear < 18) {
					return new Error("Your age must be equal or more than 18!");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validateLocationID = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("Location is required!");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validateAge = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("Age is required!");
				} else if (Number(value) < 18) {
					return new Error("Age should be above 18");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validateEmail = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("Email is required!");
				} else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
					return new Error("Incorrect email, try it again!");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validatePassword = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("Email is required!");
				} else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
					return new Error("Password must contain 8 symbols, 1 upper case and 1 digit");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validatePhoneNumber = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("Phone is required!");
				} else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
					return new Error("Incorrect phone, try it again!");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}

export const validatePassions = () => {
	return [
		{
			required: true,
			validator(rule, value) {
				if (!value.length) {
					return new Error("At least one passion is required!");
				}
				return true;
			},
			trigger: ["blur", "input"]
		}
	]
}
