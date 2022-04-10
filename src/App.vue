<template>
	<n-config-provider :theme="darkTheme">
		<n-dialog-provider>
			<the-login></the-login>
		</n-dialog-provider>
	</n-config-provider>
</template>

<script setup>
import TheLogin from "@/components/TheLogin";
import { darkTheme } from 'naive-ui';

</script>


<style lang="scss">

</style>
