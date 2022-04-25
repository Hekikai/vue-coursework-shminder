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
		title: 'Country name',
		key: 'countryName'
	},
	{
		title: 'Passion name',
		key: 'passionName'
	},
	{
		title: 'Total users count',
		key: 'totalUsersCount'
	},

];

const {
	loadStatisticByMaxPassions,
	columns, pagination, page,
	returnableRef: countriesRef
} = useNecessaryInfo(localColumns);


onMounted(() => loadStatisticByMaxPassions());

watch(
		() => page.value,
		() => {
			loadStatisticByMaxPassions();
		}
);
</script>

<style scoped>

</style>