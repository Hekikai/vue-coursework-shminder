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
			<div class="container__btns">
				<n-button @click="handleLogin">Login</n-button>
				<n-button @click="handleRegistration">Click to register</n-button>
			</div>
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

const handleLogin = () => {
	store.dispatch('auth/login', formValue.value).then(
			() => {
				router.replace({path: '/main/profile'});
			},
			(error) => {
				dialog.error({
					title: 'Failed to login',
					content: error,
				})
			}
	)
}

const handleRegistration = () => {
	router.push({path: '/registration'});
}

</script>

<style scoped lang="scss">

.container {
	background-color: black;
	height: 100%;

	&__card {
		text-align: center;
		margin: 0 auto;
		width: 25%;
		transform: translateY(50%);
	}

	&__btns {
		padding: 5px;
		display: flex;
		justify-content: center;
		gap: 20px;
	}
}

</style>