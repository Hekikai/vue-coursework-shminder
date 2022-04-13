<template>
	<n-space>
		<n-card>
			<n-menu mode="horizontal" :options="menuOptions"></n-menu>
		</n-card>
		<router-view></router-view>
	</n-space>
</template>

<script setup>
import { EventBus } from "@/utils/EventBus";
import { RouterLink } from 'vue-router';
import { h, ref } from "vue";
import { NButton } from "naive-ui";

const menuLinks = ['profile'];

const options = menuLinks.map(name => {
	return {
		label: () => h(RouterLink, {
					to: {
						name: name,
						params: {
							lang: 'en-us'
						}
					}
				},
				{default: () => name}
		),
		key: name,
	}
});

options.push({
	label: () => h(NButton, {
		onClick: () => {
			EventBus.dispatch('logout');
		}
	}, {
		default: () => 'Logout'
	})
});

const menuOptions = ref(options);

</script>

<style scoped>

</style>