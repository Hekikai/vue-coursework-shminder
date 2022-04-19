<template>
	<n-image
			src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
			@click="handleClickProfilePhoto">

	</n-image>
	<n-list bordered v-if="me">
		<template #header>
			Full name: {{ fullName }}
			<br>
			Email: {{ me.email }}
			<br>
			Phone: {{ me.phone }}
		</template>
		<template #footer>
			About:
			<span>{{ me.about }}</span>
			<br>
			Age:
			<span>{{ produceAge(me.dateOfBirth) }}</span>
			<br>
			Gender:
			<span>{{ me.gender }}</span>
			<br>
		</template>
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
	</n-list>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useDialog } from "naive-ui";
import { produceFullName } from "@/utils/produceFullName";
import { produceAge } from "@/utils/produceAge";

const store = useStore();
const dialog = useDialog();

const usersService = inject('usersService');
const user = ref(store.state.auth.user);

const me = ref(null);
const fullName = ref('');
const passions = ref([]);
const location = ref(null);
const profileImage = ref(null);


onMounted(() => loadMe());

const loadMe = () => {
	usersService.getMyData().then(response => {
				me.value = response;
				console.log(me.value);

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

	usersService.getMyProfileImage().then(response => {
		profileImage.value = response;
	})
}

const handleClickProfilePhoto = () => {

}

</script>

<style scoped>

</style>