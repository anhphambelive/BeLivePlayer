<template>
	<div class="container-fluid belive-player-page">
		<div class="container home mt-3 mb-3">
			<b-row class="title-row">
				<b-col cols="12">
					<h1 class="text-center mt-3 mb-1">
						BELIVE PLAYER
					</h1>
				</b-col>
			</b-row>

			<b-row class="input-url-row">
				<b-col cols="12">
					<!-- Using components -->
					<b-input-group class="mt-3">
						<b-form-input
								v-model="streamUrl"
								v-on:keyup.enter="startPlayVideo(streamUrl)"
								ref="searchInput"
								:disabled="showLoading"
						></b-form-input>
						<template v-slot:prepend>
							<b-form-select
								class="bg-danger text-white"
								v-model="usePlayer"
								:options="playerOptions"
								@input="startPlayVideo(streamUrl)"
							></b-form-select>
						</template>
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

			<b-row class="url-testing-row">
				<b-col cols="3" v-for="(testingUrl, keyFile) in testingUrls" v-bind:key="keyFile">
					<div class="mt-3 mb-1">
						Video test {{ keyFile + 1 }}
						<b-button
								@click="startPlayVideo(testingUrl)"
								variant="info"
								size="sm"
								ref="button"
								:disabled="showLoading"
						>
							<b-icon-play-fill></b-icon-play-fill>
							Test
						</b-button>
					</div>
				</b-col>
			</b-row>

			<b-row class="player-wrapper-layout">
				<b-col cols="12" :key="reRenderComponent">
					<b-overlay :show="showLoading" rounded="sm" opacity="0.8">
						<video-js-player
								player-wrapper="my-watch-video"
								:video-js-player-options="videoJsPlayerOptions"
								v-if="usePlayer === 'videojs' && videoJsPlayerOptions.urlSource"
						></video-js-player>
						<plyr-player
								player-wrapper="my-watch-video"
								v-else-if="usePlayer === 'hls' || usePlayer === 'shaka'"
								:use-player="usePlayer"
								:url-source="streamUrl"
								:is-play-stream="true"
						></plyr-player>
						<template v-slot:overlay>
							<div class="text-center">
								<b-icon icon="three-dots" font-scale="3" animation="cylon"></b-icon>
								<p id="cancel-label">Loading video, please wait...</p>
							</div>
						</template>
					</b-overlay>
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