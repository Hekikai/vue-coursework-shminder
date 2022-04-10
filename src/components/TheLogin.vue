<template>
	<div class="container">
		<n-card class="container__card">
			<n-space :vertical="true">
				<n-gradient-text
						style="display: block"
						:size="24"
						type="success"
				>
					Login Form
				</n-gradient-text>
				<n-image
						width="200"
						src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
						alt="Login photo"
						preview-disabled
				>
				</n-image>
			</n-space>
			<n-form
					:model="formValue"
					label-width="auto"
			>
				<n-form-item label="Username">
					<n-input
							v-model:value="formValue.username"
							placeholder="Enter your email">
					</n-input>
				</n-form-item>
				<n-form-item label="Password">
					<n-input
							v-model:value="formValue.password" type="password"
							placeholder="Enter your password">
					</n-input>
				</n-form-item>
			</n-form>
			<n-button @click="onSubmit">Submit</n-button>
		</n-card>
	</div>
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
				router.replace({path: '/profile'});
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
	background-color: black;
	height: 100vh;

	&__card {
		text-align: center;
		margin: 0 auto;
		width: 25%;
		transform: translateY(50%);
	}
}

</style>