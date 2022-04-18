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
					<n-form-item-gi :span="8" label="First name" path="firstNameValue">
						<n-input
								v-model:value="model.firstNameValue"
								placeholder="Enter your first name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Middle name" path="middleNameValue">
						<n-input
								v-model:value="model.middleNameValue"
								placeholder="Enter your middle name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Last name" path="lastNameValue">
						<n-input
								v-model:value="model.lastNameValue"
								placeholder="Enter your last name"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Age" path="ageValue">
						<n-input-number
								v-model:value="model.ageValue"
								placeholder="18"
								min="18"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Email" path="emailValue">
						<n-input
								v-model:value="model.emailValue"
								type="email"
								placeholder="Enter your email"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Gender" path="radioGroupValue">
						<n-radio-group
								v-model:value="model.radioGroupValue"
								name="gender-radio-group"
						>
							<n-space>
								<n-radio value="Radio 1">
									Male
								</n-radio>
								<n-radio value="Radio 2">
									Female
								</n-radio>
								<n-radio value="Radio 3">
									Attack helicopter
								</n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Password" path="passwordValue">
						<n-input
								v-model:value="model.passwordValue"
								type="password"
								placeholder="Enter your password"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Phone" path="phoneValue">
						<n-input
								v-model:value="model.phoneValue"
								type="tel"
								placeholder="Enter your phone"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Select your country" path="countryValue">
						<n-select
								v-model:value="model.countryValue"
								placeholder="Country"
								filterable
								:reset-menu-on-options-change="false"
								:options="countriesRef"
								@scroll="handleScrollCountries"
								@search="handleSearchingCountry"
								@update:value="handleSelectCountry"
						/>
					</n-form-item-gi>
					<n-form-item-gi :span="8" label="Select your country location" path="locationValue">
						<n-select
								v-model:value="model.locationValue"
								placeholder="Location"
								:options="locationsRef"
								filterable
								@search="handleSearchingLocation"
						/>
					</n-form-item-gi>
					<n-form-item-gi
							:span="20"
							label="Passions"
							path="passionsValues"
					>
						<n-checkbox-group v-model:value="model.passionsValues">
							<n-space item-style="display: flex;">
								<n-checkbox
										v-for="passion in passionsRef"
										:value="passion.value"
										:label="passion.label">
								</n-checkbox>
							</n-space>
						</n-checkbox-group>
					</n-form-item-gi>
					<n-form-item-gi :span="16" label="Tell us about yourself" path="textareaValue">
						<n-input
								placeholder="Something about you"
								type="textarea"
								:autosize="{
            minRows: 1,
            maxRows: 3
          }"
						/>
					</n-form-item-gi>
				</n-grid>
				<div style="display: flex; justify-content: center">
					<n-button round type="primary" @click="handleValidate">
						Register
					</n-button>
				</div>
			</n-form>
		</n-card>
	</div>
</template>

<script setup>
import { inject, onMounted, reactive, ref, watchEffect } from "vue";
import { useMessage } from 'naive-ui';

const message = useMessage();

const locationsService = inject('locationsService');
const passionsService = inject('passionsService');
const countriesService = inject('countriesService');

const size = ref('large');
const formRef = ref(null);
const locationsRef = ref([]);
const countriesRef = ref([]);
const passionsRef = ref([]);


const model = ref({
	firstNameValue: null,
	middleNameValue: null,
	lastNameValue: null,
	ageValue: null,
	emailValue: null,
	passwordValue: null,
	phoneValue: null,
	radioGroupValue: null,
	countryValue: null,
	passionsValues: null,
	locationValue: null,
});

watchEffect(() => {
	console.log(model.value.countryValue)
	console.log(model.value.passionsValues)
})

onMounted(() => mountedFetch());

const mountedFetch = () => {
	Promise.allSettled([
		loadPassions(),
		loadCountries()
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

const loadLocationsByCountry = (countryName) => {
	locationsService.getLocationsByCountryName(countryName).then(response => {
		appendLocations(response);
	})
};

const handleSearchingLocation = (searchString) => {
	locationsService.getLocationsBySearchString(searchString).then(response => {
		appendLocations(response);
	})
};

const appendLocations = (countries) => {
	locationsRef.value = countries.map((country) => {
		return {
			label: country.city,
			value: country.city
		}
	})
};

const handleValidate = (e) => {
	e.preventDefault();
	formRef.value?.validate((errors) => {
		if (!errors) {
			message.success('Valid');
		} else {
			console.log(errors);
			message.error('Invalid');
		}
	})
};

const validateValue = () => ({
	required: true,
	trigger: ["blur", "input"],
	message: 'Please, input value'
})

const rules = {
	firstNameValue: validateValue(),
	middleNameValue: validateValue(),
	ageValue: validateValue()
};

</script>

<style scoped lang="scss">

.container {

	margin: 0 auto;
	padding: 50px;
	width: auto;

	h1 {
		text-align: center;
		margin-bottom: 1em;
	}

	&__form {
		margin: 0 auto;
		width: 80%;
	}
}
</style>