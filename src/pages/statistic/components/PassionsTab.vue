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
		title: 'Passion',
		key: 'name'
	},
	{
		title: 'Total users count',
		key: 'totalUsersCount'
	},

];

const {
	loadStatisticByPassions,
	columns, pagination, page,
	returnableRef: countriesRef
} = useNecessaryInfo(localColumns);


onMounted(() => loadStatisticByPassions());

watch(
		() => page.value,
		() => {
			loadStatisticByPassions();
		}
);
</script>

<style scoped>

</style>