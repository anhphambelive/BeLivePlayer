<template>
	<div class="web-rtc-player">
		<video
				:id="playerWrapper"
				autoplay
				class="video-player"
				playsinline
				disablePictureInPicture
				:controls="isShowControl"
				:muted="isMuteAudio"
				oncontextmenu="return false;"
				preload="auto"
		></video>
	</div>
</template>

<script>
	import WebRtcPlayer from "../assets/js/components/web-rtc-player";

	export default WebRtcPlayer;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/web-rtc-player";
</style>
