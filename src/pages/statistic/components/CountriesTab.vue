<template>
	<n-data-table
			:columns="columns"
			:data="countriesRef"
			:pagination="pagination"/>
</template>

<script setup>

import { onMounted, watch } from "vue";
import { useNecessaryInfo } from "@/pages/statistic/hooks/useNecessaryInfo";

const localColumns = [
	{
		title: 'Country',
		key: 'name'
	},
	{
		title: 'Total locations count',
		key: 'totalLocationsCount'
	}
];

const {
	loadStatisticByCountries,
	columns, pagination, page,
	returnableRef: countriesRef
} = useNecessaryInfo(localColumns);


onMounted(() => loadStatisticByCountries());

watch(
		() => page.value,
		() => {
			loadStatisticByCountries();
		}
);

</script>

<style scoped>

</style>