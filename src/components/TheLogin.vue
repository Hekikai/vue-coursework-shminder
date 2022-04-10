<template>
<n-card>
	<n-form :model="formValue">
		<n-form-item label="Username">
			<n-input v-model:value="formValue.username"></n-input>
		</n-form-item>
		<n-form-item label="Password">
			<n-input v-model:value="formValue.password" type="password"></n-input>
		</n-form-item>
	</n-form>
	<n-button @click="onSubmit">Submit</n-button>
</n-card>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";

const store = useStore();
const router = useRouter();
const dialog = useDialog();

const formValue = ref({
	username: '',
	password: '',
})

const onSubmit = () => {
	store.dispatch('auth/login', formValue.value).then(
			() => {
				router.replace({ path: '/profile' });
			},
			(error) => {
				dialog.error({
					title: 'Failed to login',
					content: error,
				})
			}
	)
}

</script>

<style scoped lang="scss">

.container {
	margin: 0 auto;

	&__card {
		margin: 0 auto;
		text-align: center;
		padding: 15px;
	}

	.form-group {
		padding: 10px;
		label {
			margin-right: 15px;
		}
	}
}

</style>