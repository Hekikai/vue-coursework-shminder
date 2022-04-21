<template>
	<n-card
			class="container"
			:style="styleObject"
			:title="title ?? ''">
		<slot></slot>
	</n-card>
</template>

<script>
export default {
	name: "TheWrapper",
	props: {
		title: String,
		width: Number
	},
	computed: {
		styleObject() {
			return {
				width: `${this.width}%`
			}
		}

	}
}
</script>

<style scoped>

.container {
	margin: 0 auto;
	height: 100%;
}


</style>