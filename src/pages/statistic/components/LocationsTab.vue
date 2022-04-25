<template>
	<n-data-table
			:columns="columns"
			:data="countriesRef"
			:pagination="pagination"/>
</template>

<script setup>
import { useNecessaryInfo } from "@/pages/statistic/hooks/useNecessaryInfo";
import { onMounted, watch } from "vue";

const localColumns = [
	{
		title: 'City',
		key: 'city'
	},
	{
		title: 'Users count',
		key: 'totalUsersCount'
	},

];

const {
	loadStatisticByLocations,
	columns, pagination, page,
	returnableRef: countriesRef
} = useNecessaryInfo(localColumns);


onMounted(() => loadStatisticByLocations());

watch(
		() => page.value,
		() => {
			loadStatisticByLocations();
		}
);
</script>

<style scoped>

</style>