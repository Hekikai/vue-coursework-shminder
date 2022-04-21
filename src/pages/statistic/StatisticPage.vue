<template>
	<the-statistic-page-menu @selectOption="handleSelectOption">
		<template #default>
			<n-data-table
					:columns="columns"
					:data="countriesRef"
					:pagination="pagination"/>
		</template>
	</the-statistic-page-menu>
</template>

<script setup>
import TheStatisticPageMenu from './StatisticPageMenu';
import { inject, onMounted, reactive, ref, watch } from "vue";

const statisticService = inject('statisticService');

onMounted(() => fetchOnMount());
const countriesRef = ref([]);
const pageSize = ref(10);
const page = ref(1);
const columns = ref([
	{
		title: 'Country name',
		key: 'countryName'
	},
	{
		title: 'Total country locations',
		key: 'countryLocations'
	},
]);

const pagination = reactive({
	page,
	pageSize,
	onChange: (page) => {
		pagination.page = page;
	},
	onUpdatePageSize: (pageSize) => {
		pagination.pageSize = pageSize;
		pagination.page = 1;
	}
});

const handleSelectOption = (key) => {
	page.value = 1;
	console.log(key)
}

watch(
		() => page.value,
		(page, prevPage) => {
			loadStatisticByCountry();
		}
)

const fetchOnMount = () => {
	Promise.allSettled([
		loadStatisticByCountry()
	])
}

const loadStatisticByCountry = () => {
	statisticService.getStatisticByCountries(page.value, pageSize.value).then(response => {
		response.forEach((country, index) => {
			countriesRef.value.push({
				key: index,
				countryName: country.name,
				countryLocations: country.totalLocationsCount
			});
		})
	})
}

</script>

<style scoped>

</style>