<template>
	<section class="section">
		<n-card v-for="user in usersToEstimate" class="section__container"
						:title="produceCardTitle(user)">
			<template #cover>
				<img class="section__image"
						 src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
			</template>
			<n-card class="section__card">
				<n-button class="section__badge" v-for="passion in user.passions">
					{{ passion.name }}
				</n-button>
			</n-card>
			<n-card class="info">
				{{ user.about || 'There is no description ' }}
			</n-card>
			<n-space justify="space-between">
				<n-button @click="likeThisOne(user.id)">Like</n-button>
				<n-button @click="unlikeThisOne(user.id)">Dislike</n-button>
			</n-space>
		</n-card>
	</section>
</template>

<script setup>
import {  inject, onMounted, ref } from "vue";
import { useDialog } from "naive-ui";
import { produceCardTitle } from "@/utils/produceCardTitle";

const usersService = inject('usersService');
const tokenService = inject('tokenService');
const dialog = useDialog();
const userInfo = tokenService.getUser();
const genderToSearch = userInfo.gender === 'MALE'
		? 'FEMALE'
		: 'FEMALE'
				? 'MALE'
				: 'ATTACKHELICOPTER';

const usersToEstimate = ref([]);

//TODO: notification when like is ok not ok
const likeThisOne = (id) => {
	usersService.likeUser(id).then(console.log)
}

//TODO: notification when unlike is ok or not ok
const unlikeThisOne = (id) => usersService.unlikeUser(id).then(console.log)

const loadUsers = () => {
	usersService.getUsers('MALE').then(response => {
				console.log(response);
				response.forEach(user => usersToEstimate.value.push(user));
			},
			error => {
				dialog.error({
					title: 'Failed to load users',
					content: error
				})
			})
}

onMounted(() => loadUsers())

</script>

<style scoped lang="scss">

.section {
	display: flex;
	gap: 20px;
	flex-direction: column;

	&__card {
		margin-top: 20px;
	}

	&__container {
		max-height: 500px;

		.info {
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}

	&__image {
		max-height: 400px;
		object-fit: cover;
	}

	&__badge {
		padding: 10px;
		margin-right: 20px;
		cursor: default;


	}
}

</style>