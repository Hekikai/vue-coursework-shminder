<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>
			<n-dialog-provider>
				<router-view></router-view>
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, onBeforeUnmount, provide } from "vue";
import { eventBus } from "@/utils/eventBus";
import { registeredServices } from "@/services/registeredServices";

const store = useStore();
const router = useRouter();

const logOut = () => {
	store.dispatch('auth/logout');
	router.push({name: 'TheLogin'});
}

onMounted(() => eventBus.on('logout', () => logOut()))

onBeforeUnmount(() => eventBus.remove('logout'));

for (const injected of registeredServices) {
	provide(injected.injectKey, injected.service);
}

</script>

<style lang="scss">

</style>
