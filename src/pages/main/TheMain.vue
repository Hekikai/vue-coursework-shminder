<template>
	<n-space vertical size="large">
		<n-card>
			<n-menu
					mode="horizontal"
					:options="menuOptions">
			</n-menu>
		</n-card>
		<router-view></router-view>
	</n-space>
</template>

<script setup>
import { eventBus } from "@/utils/eventBus";
import { RouterLink } from 'vue-router';
import { h, ref } from "vue";
import { NButton } from "naive-ui";

const menuLinks = ['profile', 'statistic'];

const options = menuLinks.map(name => {
	return {
		label: () => h(RouterLink, {
					to: {
						name: name,
						params: {
							lang: 'en-us'
						}
					},
				},
				{
					default: () => name[0].toUpperCase() + name.slice(1)
				}
		),
		key: name,
	}
});

options.push({
	label: () => h(NButton, {
		onClick: () => {
			eventBus.dispatch('logout');
		}
	}, {
		default: () => 'Logout'
	})
});

const menuOptions = ref(options);

</script>

<style scoped>

</style>