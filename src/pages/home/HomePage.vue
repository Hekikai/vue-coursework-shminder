<template>
	<section class="section">
		<n-spin v-if="usersToEstimate.length === 0" size="large"/>
		<n-card v-else
						v-for="user in usersToEstimate"
						class="section__container"
						:title="produceCardTitle(user)">
			<template #cover>
				<img class="section__image"
						 :src="user.image"
						 alt="User photo">
			</template>
			<n-thing :title="`Gender: ${user.gender}`"></n-thing>
			<n-card class="section__card">
				<n-button
						v-for="passion in user.passions"
						strong
						secondary
						round
						type="primary"
						class="section__badge"
				>
					{{ passion.name }}
				</n-button>
			</n-card>
			<n-card class="info">
				{{ user.about || 'There is no description ' }}
			</n-card>
			<n-space justify="space-between">
				<n-button
						@click="likeThisOne(user.id, user.firstName)"
						type="success">
					Like
				</n-button>
				<n-button
						@click="unlikeThisOne(user.id, user.firstName)"
						type="error">
					Dislike
				</n-button>
			</n-space>
		</n-card>
	</section>
</template>

<script setup>
import { inject, onMounted, ref, shallowRef } from "vue";
import { useDialog, useMessage } from "naive-ui";
import { produceCardTitle } from "@/utils/produceCardTitle";

const usersService = inject('usersService');
const tokenService = inject('tokenService');
const userImageService = inject('userImageService');

const dialog = useDialog();
const message = useMessage();
const userInfo = tokenService.getUser();

const genderToSearch = userInfo.gender === 'MALE'
		? 'FEMALE'
		: 'FEMALE'
				? 'MALE'
				: 'ATTACKHELICOPTER';

const usersToEstimate = ref([]);

const likeThisOne = (id, firstName) => {
	usersService.likeUser(id).then(response => {
		message.info(
				`You've liked ${ firstName }!`,
				{
					closable: true,
					duration: 2000
				}
		)
	}, error => {
		dialog.error({
			title: 'Failed to like user',
			content: error
		})
	})
}

const unlikeThisOne = (id, firstName) => {
	usersService.unlikeUser(id).then(response => {
		message.warning(
				`You've unliked ${ firstName }!`,
				{
					closable: true,
					duration: 2000
				}
		)
	}, error => {
		dialog.error({
			title: 'Failed to unlike user',
			content: error
		})
	})
}

const loadUsers = () => {
	usersService.getUsers(genderToSearch).then(response => {
				response.forEach(async user => {
					user.image = await userImageService.getUserImage(user.id);
					usersToEstimate.value.push(user)
				});
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
	flex-wrap: wrap;

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