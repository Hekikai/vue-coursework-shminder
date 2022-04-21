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
					v-model:value="activeKey"
					:collapsed="collapsed"
					:collapsed-width="64"
					:collapsed-icon-size="22"
					:options="menuOptions"
					@update:value="updateValue(activeKey)"
			/>
		</n-layout-sider>
		<span>{{ activeKey }}</span>
	</n-layout>
</template>

<script setup>
import { NIcon } from 'naive-ui';
import { h, ref } from 'vue';
import {
	LocationOutline as LocationIcon,
	HappyOutline as PassionIcon,
	BusinessOutline as CountryIcon
} from "@vicons/ionicons5";

const renderIcon = (icon) => {
	return () => h(NIcon, null, {default: () => h(icon)});
}

const activeKey = ref(null);
const collapsed = ref(false);

const updateValue = (key) => {
	console.log(key);
}

const menuOptions = [
	{
		label: "Countries",
		key: "countries",
		icon: renderIcon(CountryIcon)
	},
	{
		label: "Passions",
		key: "passions",
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Passions by country",
		key: "passions-by-country",
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Max passions by countries",
		key: "max-passions-by-countries",
		icon: renderIcon(PassionIcon),
	},
	{
		label: "Locations",
		key: "locations",
		icon: renderIcon(LocationIcon),
	},
]

</script>

<style scoped>

</style>