<template>
	<video
			:id="playerWrapper"
			class="video-player-wrapper video-player plyr-video-player"
			controls
			crossorigin
			ref="plyrPlayer"
			playsinline
			preload="auto"
			:poster="poster">
	</video>
</template>

<script>
	import PlyrPlayer from "../assets/js/components/plyr-player";

	export default PlyrPlayer;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/plyr-player";
</style>