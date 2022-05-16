<template>
	<div class="container">
		<n-card class="container__card">
			<h1>Registration Form</h1>
			<n-form
					ref="formRef"
					:model="model"
					:rules="rules"
					:size="size"
					label-placement="top"
					class="container__form"
			>
				<n-grid :span="16" :x-gap="20" :cols="16">
					<n-form-item-gi :span="8" label="First name" path="firstName">
						<n-input
								autofocus
								v-model:value="model.firstName"
								placeholder="Enter your first name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Last name" path="lastName">
						<n-input
								v-model:value="model.lastName"
								placeholder="Enter your last name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Middle name" path="middleName">
						<n-input
								v-model:value="model.middleName"
								placeholder="Enter your middle name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Date of birth" path="dateOfBirth">
						<n-date-picker
								v-model:formatted-value="model.dateOfBirth"
								type="date"
								value-format="yyyy-MM-dd"
								default-formatted-value="2004-01-01"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Email" path="email">
						<n-input
								v-model:value="model.email"
								type="email"
								placeholder="Enter your email"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Gender" path="gender">
						<n-radio-group
								v-model:value="model.gender"
								name="gender-radio-group"
						>
							<n-space>
								<n-radio value="MALE">
									Male
								</n-radio>
								<n-radio value="FEMALE">
									Female
								</n-radio>
								<n-radio value="ATTACKHELICOPTER">
									Attack helicopter
								</n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Password" path="password">
						<n-input
								v-model:value="model.password"
								type="password"
								placeholder="Enter your password"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Phone" path="phone">
						<n-input
								v-model:value="model.phone"
								type="tel"
								placeholder="Enter your phone"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Select your country" path="country">
						<n-select
								v-model:value="model.country"
								placeholder="Country"
								filterable
								:reset-menu-on-options-change="false"
								:options="countriesRef"
								@scroll="handleScrollCountries"
								@search="handleSearchingCountry"
								@update:value="handleSelectCountry"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Select your country location" path="locationId">
						<n-select
								v-model:value="model.locationId"
								placeholder="Location"
								filterable
								:reset-menu-on-options-change="false"
								:options="locationsRef"
								@search="handleSearchingLocation"
						/>
					</n-form-item-gi>
					<n-form-item-gi
							:span="20"
							label="Passions"
							path="passionsIds"
					>
						<n-checkbox-group v-model:value="model.passionsIds">
							<n-space item-style="display: flex;">
								<n-checkbox
										v-for="passion in passionsRef"
										:value="passion.value"
										:label="passion.label">
								</n-checkbox>
							</n-space>
						</n-checkbox-group>
					</n-form-item-gi>
					<n-form-item-gi :span="16" label="Tell us about yourself" path="about">
						<n-input
								placeholder="Something about you"
								v-model:value="model.about"
								type="textarea"
								:autosize="{
            minRows: 1,
            maxRows: 3
          }"
						/>
					</n-form-item-gi>
				</n-grid>
				<div style="display: flex; justify-content: center; align-items: center">
					<n-button
							round
							type="primary"
							@click="handleValidate">
						Register
					</n-button>
					<n-button
							round
							type="primary"
							style="margin-left: 25px"
							@click="router.go(-1);">
						Go back
					</n-button>
				</div>
			</n-form>
		</n-card>
	</div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from 'naive-ui';
import { useDialog } from "naive-ui";

import {
	validatedValue,
	validateAge,
	validatePassword,
	validateEmail,
	validatePhoneNumber,
	validatePassions,
	validateLocationID,
	validateDateOfBirth
} from "@/utils/validators";

const message = useMessage();
const router = useRouter();
const dialog = useDialog();

const locationsService = inject('locationsService');
const passionsService = inject('passionsService');
const countriesService = inject('countriesService');
const usersService = inject('usersService');

const size = ref('large');
const formRef = ref(null);
const locationsRef = ref([]);
const countriesRef = ref([]);
const passionsRef = ref([]);


const model = ref({
	firstName: '',
	middleName: '',
	lastName: '',
	dateOfBirth: '2004-01-01',
	email: '',
	password: '',
	phone: '',
	gender: null,
	country: null,
	passionsIds: [],
	locationId: null,
	about: ''
});

onMounted(() => mountedFetch());

const mountedFetch = () => {
	Promise.allSettled([
		loadPassions(),
		loadCountries(),
	])
};

const loadPassions = () => {
	passionsService.getAllPassions().then(response => {
		response.forEach((passion) => {
			passionsRef.value.push({
				label: passion.name,
				value: passion.id
			})
		})
	})
};

const loadCountries = () => {
	countriesService.getPaginatedCountries().then(response => {
		response.forEach((country) => {
			countriesRef.value.push({
				label: country.name,
				value: country.name
			})
		})
	})
};

const loadLocationsByCountry = (countryName) => {
	locationsService.getLocationsByCountryName(countryName).then(response => {
		appendLocations(response);
	})
};

const handleScrollCountries = (event) => {
	const currentTarget = event.currentTarget;
	if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
		loadCountries();
	}
};

const handleSearchingCountry = (searchString) => {
	countriesService.getCountriesBySearchString(searchString).then(response => {
				countriesRef.value = response.map((country) => {
					return {
						label: country.name,
						value: country.name
					}
				})
			}
	)
};

const handleSelectCountry = (countryName) => {
	loadLocationsByCountry(countryName);
};

const handleSearchingLocation = (searchString) => {
	locationsService.getLocationsBySearchString(searchString).then(response => {
		appendLocations(response);
	})
};

const handleValidate = (e) => {
	e.preventDefault();
	formRef.value?.validate((errors) => {
		if (!errors) {
			usersService.registerUser(model.value).then(response => {
				message.success('Valid');
				router.replace({path: '/vue-coursework-shminder/login'})
			}).catch(error => {
				dialog.error({
					title: 'Failed to register',
					content: error
				})
			})
		} else {
			console.log(errors);
			message.error('Fill all the required spots!');
		}
	})
};

const appendLocations = (countries) => {
	locationsRef.value = countries.map((country) => {
		return {
			label: country.city,
			value: country.id
		}
	})
};

const rules = {
	firstName: validatedValue('first name'),
	lastName: validatedValue('last name'),
	age: validateAge(),
	email: validateEmail(),
	gender: validatedValue('gender', 'select'),
	password: validatePassword(),
	phone: validatePhoneNumber(),
	country: validatedValue('country', 'select'),
	locationId: validateLocationID(),
	passionsIds: validatePassions(),
	dateOfBirth: validateDateOfBirth()
};

</script>

<style scoped lang="scss">

.container {

	margin: 0 auto;
	width: 100%;
	padding: 50px;

	h1 {
		text-align: center;
		margin-bottom: 0.5em;
	}

	&__card {
		max-width: 45%;
		margin: 0 auto;
	}

	&__form {
		padding: 1em;
	}
}
</style>