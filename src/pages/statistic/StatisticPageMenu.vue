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

import {
	CountriesTab,
	LocationsTab,
	MaxPassionsTab,
	PassionsByCountryTab,
	PassionsTab
} from './components/index';

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
		key: markRaw(CountriesTab),
		icon: renderIcon(CountryIcon),
	},
	{
		label: "Passions",
		key: markRaw(PassionsTab),
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Passions by country",
		key: markRaw(PassionsByCountryTab),
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Max passions by countries",
		key: markRaw(MaxPassionsTab),
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Locations",
		key: markRaw(LocationsTab),
		icon: renderIcon(LocationIcon),
	},
]

</script>

<style scoped>

</style>