<template>
	<n-spin v-if="!userImage" size="large"/>
		<n-image
				v-else
				:src="userImage"
				object-fit="cover"
				width="400"
				height="200"
				alt="Profile photo">
		</n-image>
	<n-list bordered v-if="me">
		<template #header>
			Full name: {{ fullName }}
			<br>
			Email: {{ me.email }}
			<br>
			Phone: {{ me.phone }}
		</template>
		<n-list-item>
			About:
			<span>{{ me.about }}</span>
			<br>
			Age:
			<span>{{ produceAge(me.dateOfBirth) }}</span>
			<br>
			Gender:
			<span>{{ me.gender }}</span>
			<br>
		</n-list-item>
		<n-list-item>
			<n-thing title="Location" v-if="location">
				<n-space>
					<n-text>{{ location.city }}</n-text>
				</n-space>
			</n-thing>
		</n-list-item>
		<n-list-item>
			<n-thing title="Passions">
				<p v-for="passion in passions"
				>
					{{ passion.name }}
				</p>
			</n-thing>
		</n-list-item>
		<n-list-item>
			<n-thing title="Liked users"></n-thing>
			<n-space>
				<n-card v-for="user in likedUsers">
					{{ produceFullName(user.firstName, user.middleName, user.lastName) }}
				</n-card>
			</n-space>
		</n-list-item>
	</n-list>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useDialog } from "naive-ui";
import { produceFullName } from "@/utils/produceFullName";
import { produceAge } from "@/utils/produceAge";
import userImageService from "@/services/models/users/userImage.service";

const store = useStore();
const dialog = useDialog();

const usersService = inject('usersService');
const user = ref(store.state.auth.user);

const me = ref(null);
const fullName = ref('');
const passions = ref([]);
const location = ref(null);
const likedUsers = ref([]);
const userImage = ref();


onMounted(() => Promise.all([
	loadMe(),
	loadLikedUsers()
]));

const loadMe = () => {
	usersService.getMyData().then(async response => {
				me.value = response;

				userImage.value = await userImageService.getUserImage(response.id);

				fullName.value = produceFullName(me.value.firstName, me.value.lastName, me.value.middleName);

				passions.value = me.value.passions;

				location.value = me.value.location;
			},
			error => {
				dialog.error({
					title: 'Failed to load items',
					content: error
				})
			}
	)
}

const loadLikedUsers = () => {
	usersService.getLikedUsers().then(response => {
		response.forEach((user) => {
			likedUsers.value.push(user);
		})
	})
}


</script>

<style scoped>

</style>