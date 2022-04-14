<template>
	<div class="container">
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
				<n-form-item-gi :span="8" label="First name" path="inputValue">
					<n-input
							v-model:value="model.firstNameValue"
							placeholder="Enter your first name"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Middle name" path="inputValue">
					<n-input
							v-model:value="model.middleNameValue"
							placeholder="Enter your middle name"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Last name" path="inputValue">
					<n-input
							v-model:value="model.lastNameValue"
							placeholder="Enter your last name"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Age" path="inputNumberValue">
					<n-input-number
							v-model:value="model.ageValue"
							placeholder="18"
							min="18"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Email" path="inputValue">
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
				<n-form-item-gi :span="8" label="Password" path="inputValue">
					<n-input
							v-model:value="model.passwordValue"
							type="password"
							placeholder="Enter your password"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Phone" path="inputValue">
					<n-input
							v-model:value="model.phoneValue"
							type="tel"
							placeholder="Enter your phone"
					/>
				</n-form-item-gi>
				<n-form-item-gi :span="8" label="Select your location" path="selectValue">
					<n-select
							v-model:value="model.locationValue"
							placeholder="Locations"
							:options="generalOptions"
					/>
				</n-form-item-gi>
				<n-form-item-gi
						:span="20"
						label="Passions"
						path="passionsValues"
				>
					<n-checkbox-group v-model:value="model.passionsValues">
						<n-space>
							<n-checkbox
									v-for="passion in model.passionsValues"
									:key="passion.id"
									:value="passion.id"
									@click="clickMe"
							>
								{{ passion.name }}
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
	</div>
</template>

<script setup>
import { inject, onMounted, reactive, ref, toRefs } from "vue";
import { useMessage } from 'naive-ui';

const message = useMessage();

const size = ref('large');
const formRef = ref(null);

const passionsService = inject('passionsService');

const model = reactive({
	firstNameValue: null,
	middleNameValue: null,
	lastNameValue: null,
	ageValue: null,
	emailValue: null,
	passwordValue: null,
	phoneValue: null,
	radioGroupValue: null,
	locationValue: null,
	passionsValues: null,
});

const loadPassions = () => {
	passionsService.getAllPassions().then(response => {
				// console.log(model.passionsValues);
				model.passionsValues = response;
				// console.log(model.passionsValues);
			}
	)
}

onMounted(() => loadPassions());

const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
		(v) => ({
			label: v,
			value: v
		})
)

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
}

const rules = {
	firstNameValue: {
		required: true,
		trigger: ["blur", "input"],
		message: 'Please, input value'
	},
	middleNameValue: {
		required: true,
		trigger: ["blur", "input"],
		message: 'Please, input value'
	},
}

const clickMe =() => {
	console.log(model.passionsValues)
}

</script>

<style scoped lang="scss">

.container {
	h1 {
		text-align: center;
		margin-bottom: 1em;
	}

	padding: 50px;

	&__form {
		margin: 0 auto;
		width: 50%;
	}
}
</style>