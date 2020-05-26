<template>
	<div class="container-fluid belive-player-page">
		<div class="container home mt-3 mb-3">
			<b-row class="input-url-row">
				<b-col cols="12">
					<h1 class="text-center mt-3 mb-1">
						BELIVE PLAYER
					</h1>
				</b-col>
			</b-row>

			<b-row class="input-url-row">
				<b-col cols="12">
					<!-- Using components -->
					<b-input-group prepend="Url" class="mt-3">
						<b-form-input
								v-model="streamUrl"
								v-on:keyup.enter="startPlayVideo(streamUrl)"
								ref="searchInput"
								:disabled="showLoading"
						></b-form-input>
						<b-input-group-append>
							<b-button
									@click="startPlayVideo(streamUrl)"
									variant="outline-success"
									ref="button"
									:disabled="showLoading"
							>
								<b-icon-play-fill></b-icon-play-fill>
								Play
							</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-col>
			</b-row>

			<b-row class="player-wrapper-layout">
				<b-col cols="12">
<!--					<b-overlay :show="showLoading" rounded="sm" opacity="0.8">-->
						<video-js-player
								player-wrapper="my-watch-video"
								:video-js-player-options="videoJsPlayerOptions"
								:key="reRenderComponent"
								v-if="usePlayer === 'videojs' && videoJsPlayerOptions.urlSource"
						></video-js-player>
						<plyr-player
								player-wrapper="my-watch-video"
								v-else-if="usePlayer === 'third-party-player'"
								:url-source="streamUrl"
								:is-play-stream="true"
								:key="reRenderComponent"
						></plyr-player>
						<template v-slot:overlay>
							<div class="text-center">
								<b-icon icon="three-dots" font-scale="3" animation="cylon"></b-icon>
								<p id="cancel-label">Loading video, please wait...</p>
							</div>
						</template>
<!--					</b-overlay>-->
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
	import CheckPlayer from "../assets/js/pages/check-player"
	export default CheckPlayer
</script>

<style lang="scss" scoped>
	@import "../assets/scss/pages/check-player";
</style>