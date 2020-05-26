<template>
	<div class="video-player-wrapper video-js-player-wrapper" v-if="videoJsPlayerOptions.urlSource">
		<video
				:id="playerWrapper"
				:poster="imgCover"
				autoplay
				class="video-js video-center"
				oncontextmenu="return false;"
				preload="auto"
				ref="videoPlayer"
				playsinline
				webkit-playsinline
		>
			<source :src="videoJsPlayerOptions.urlSource" :type="typeVideo"/>
			<p class="vjs-no-js">
				To view this video please enable JavaScript, and consider upgrading to a
				web browser that
				<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
			</p>
		</video>
	</div>
</template>

<script>
	import VideoJsPlayer from "../assets/js/components/video-js-player";

	export default VideoJsPlayer;
</script>

<style lang="scss" scoped>
	@import "../assets/scss/components/video-js-player";
</style>
