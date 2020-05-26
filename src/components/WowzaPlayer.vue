<template>
	<div :id="playerWrapper" class="wowza-player-wrapper"></div>
</template>

<script>
	import WowzaPlayer from "../assets/js/components/wowza-player";

	export default WowzaPlayer;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/wowza-player";
</style>
