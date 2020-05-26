<template>
	<div class="card sdk-card">
		<div class="card-header">
			<slot name="card-header"></slot>

		</div>
		<div class="card-body">
			<slot name="card-body">
			</slot>
		</div>
		<div class="card-footer">
			<slot name="card-footer">
			</slot>
		</div>
		<b-overlay class="overlay-card-sdk" :show="isShowLoading" no-wrap>
		</b-overlay>
	</div>
</template>

<script>
	import Card from "../assets/js/components/card";

	export default Card;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/card";
</style>
