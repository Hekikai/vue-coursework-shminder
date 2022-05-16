<template>
	<n-layout has-sider>
		<n-layout-sider
				bordered
				collapse-mode="width"
				:collapsed-width="64"
				:width="240"
				:collapsed="collapsed"
				show-trigger
				@collapse="collapsed = true"
				@expand="collapsed = false"
		>
			<n-menu
					v-model:value="activeTab"
					:collapsed="collapsed"
					:collapsed-width="64"
					:collapsed-icon-size="36"
					:icon-size="24"
					:options="menuOptions"
					@update:value="updateTab(activeTab)"
			/>
		</n-layout-sider>
		<slot></slot>
	</n-layout>
</template>

<script setup>
import { NIcon } from 'naive-ui';
import { h, markRaw, ref } from 'vue';
import {
	LocationOutline as LocationIcon,
	HappyOutline as PassionIcon,
	BusinessOutline as CountryIcon
} from "@vicons/ionicons5";

const emit = defineEmits(['selectTab']);

const renderIcon = (icon) => {
	return () => h(NIcon, null, {default: () => h(icon)});
}

const activeTab = ref(null);
const collapsed = ref(false);

const updateTab = (tab) => emit('selectTab', tab);

const menuOptions = [
	{
		label: "Countries",
		key: 0,
		icon: renderIcon(CountryIcon),
	},
	{
		label: "Locations",
		key: 1,
		icon: renderIcon(LocationIcon),
	},
	{
		label: "Passions by country",
		key: 2,
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Max passions by countries",
		key: 3,
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Passions",
		key: 4,
		icon: renderIcon(PassionIcon),
	},
]

</script>

<style scoped>

</style>