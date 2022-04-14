<template>
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
			<span>{{ me.age }}</span>
			<br>
			Gender:
			<span>{{ me.gender }}</span>
			<br>
			Roles:
			<n-thing v-for="role in me.roles">
				{{ role.name }}
			</n-thing>
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
					{{ passion.name }} (total users count: {{ passion.totalUsersCount }})
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

const store = useStore();
const dialog = useDialog();

const usersService = inject('usersService');
const user = ref(store.state.auth.user);

const me = ref(null);
const fullName = ref('');
const passions = ref([]);
const location = ref(null);

onMounted(() => loadMe());

const loadMe = () => {
	usersService.getMyData().then(response => {
				me.value = response;

				fullName.value = produceFullName(me.value.firstName, me.value.middleName,
						me.value.lastName);

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

</script>

<style scoped>

</style>