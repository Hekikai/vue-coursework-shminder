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
		key: 'country'
	},
	{
		title: 'Passion',
		key: 'passion'
	},
	{
		title: 'Users ',
		key: 'usersCount'
	},

];

const {
	loadStatisticByPassionsInCountry,
	columns, pagination, page,
	returnableRef: countriesRef
} = useNecessaryInfo(localColumns);


onMounted(() => loadStatisticByPassionsInCountry());

watch(
		() => page.value,
		() => {
			loadStatisticByPassionsInCountry();
		}
);
</script>

<style scoped>

</style>