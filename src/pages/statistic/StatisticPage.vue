<template>
	<the-statistic-page-menu @selectTab="handleSelectOption">
		<keep-alive>
			<component :is="activeTab"/>
		</keep-alive>
	</the-statistic-page-menu>
</template>

<script setup>
import TheStatisticPageMenu from './StatisticPageMenu';
import { ref } from "vue";

const activeTab = ref(null);
const handleSelectOption = (tabToDisplay) => activeTab.value = tabToDisplay;

</script>

<style scoped>

</style>