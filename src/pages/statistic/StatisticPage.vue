<template>
	<statistic-page-menu @selectTab="handleSelectOption">
		<keep-alive>
			<component :is="activeTab"/>
		</keep-alive>
	</statistic-page-menu>
</template>

<script setup>
import StatisticPageMenu from './StatisticPageMenu';
import { ref } from "vue";
import tabs from './components/index';

const activeTab = ref(null);
const handleSelectOption = (tabIndex) => {
	activeTab.value = tabs[tabIndex]
};

</script>

<style scoped>

</style>