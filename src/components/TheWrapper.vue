<template>
	<n-card
			class="container"
			:title="title ?? ''">
		<slot></slot>
	</n-card>
</template>

<script>
export default {
	name: "TheProfileWrapper",
	props: {
		title: String
	}
}
</script>

<style scoped>

.container {
	margin: 0 auto;
	width: 60%;
	height: 100%;
}


</style>