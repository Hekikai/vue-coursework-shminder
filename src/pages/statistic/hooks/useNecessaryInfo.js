import { reactive, ref } from "vue";
import StatisticService from "@/services/models/statistic/statistic.service";

export const useNecessaryInfo = (columnsArray) => {

	const statisticService = new StatisticService();

	const returnableRef = ref([]);
	const pageSize = ref(10);
	const page = ref(1);

	const columns = ref(columnsArray);

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

	const loadStatisticByCountries = () => {
		statisticService.getStatisticByCountries().then(response => {
			response.forEach((country, index) => {
				returnableRef.value.push({
					key: index,
					name: country.name,
					totalLocationsCount: country.totalLocationsCount
				});
			})
		})
	};

	const loadStatisticByPassionsInCountry = () => {
		statisticService.getStatisticByCountryPassions().then(response => {
			response.forEach((country, index) => {
				returnableRef.value.push({
					key: index,
					country: country.countryName,
					passion: country.passionName,
					usersCount: country.usersCount
				})
			})
		})
	};

	const loadStatisticByLocations = () => {
		statisticService.getStatisticByLocations().then(response => {
			response.forEach((location, index) => {
				returnableRef.value.push({
					key: index,
					city: location.city,
					totalUsersCount: location.totalUsersCount
				})
			})
		})
	};

	const loadStatisticByPassions = () => {
		statisticService.getStatisticByPassions().then(response => {
			response.forEach((passion, index) => {
				returnableRef.value.push({
					key: index,
					name: passion.name,
					totalUsersCount: passion.totalUsersCount
				})
			})
		})
	};

	const loadStatisticByMaxPassions = () => {
		statisticService.getStatisticByMaxPassions().then(response => {
			response.forEach((passion, index) => {
				returnableRef.value.push({
					key: index,
					countryName: passion.countryName,
					passionName: passion.passionName,
					totalUsersCount: passion.usersCount
				})
			})
		})
	};


	return {
		columns, pagination, returnableRef,
		loadStatisticByCountries, loadStatisticByPassionsInCountry,
		loadStatisticByLocations, loadStatisticByPassions,
		loadStatisticByMaxPassions,
		page
	}
}