<template>
	<div class="container-fluid belive-player-page">
        <b-row class="text-center mt-3">
            <b-button class="switch-layout" variant="success" @click="isMultipleLayout = !isMultipleLayout">Change Layout To
                {{ (!isMultipleLayout) ? "Multiple Streams" : "Single Player" }}</b-button>
        </b-row>
		<div class="container home mt-3 mb-3" v-if="!isMultipleLayout">
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
						<video-js-player
								player-wrapper="my-watch-video"
                                v-if="usePlayer === 'videojs' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use-aws-config="false"
                                :force-auto-play-with-sound="true"
                                :isShowQualities="true"
						></video-js-player>
                        <video-js-player
								player-wrapper="my-watch-video"
                                v-else-if="usePlayer === 'videojs-aws' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use-aws-config="true"
                                :force-auto-play-with-sound="true"
                                :isShowQualities="true"
						></video-js-player>
                        <video-js-player
								player-wrapper="my-watch-video"
                                v-else-if="usePlayer === 'videojs-360' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use360-config="true"
                                :force-auto-play-with-sound="true"
                                :isShowQualities="true"
						></video-js-player>
						<plyr-player
								player-wrapper="my-watch-video"
								v-else-if="usePlayer === 'hls' || usePlayer === 'shaka'"
								:use-player="usePlayer"
								:url-source="streamUrl"
								:is-play-stream="true"
						></plyr-player>
						<wowza-player
								player-wrapper="my-watch-video"
								v-else-if="usePlayer === 'wowza'"
								:options="wowzaPlayerOptions"
						></wowza-player>
						<template v-slot:overlay>
							<div class="text-center">
								<b-icon icon="three-dots" font-scale="3" animation="cylon"></b-icon>
								<p id="cancel-label">Loading video, please wait...</p>
							</div>
						</template>
				</b-col>
			</b-row>
		</div>

        <div class="container home mt-3 mb-3" v-else>
            <b-row class="title-row">
                <b-col cols="12">
                    <h1 class="text-center mt-3 mb-1">
                        MULTIPLE STREAMS
                    </h1>
                </b-col>
            </b-row>

            <b-row class="player-wrapper-layout">
                <div class="main-wrapper">
                    <video-js-player
                        player-wrapper="main-stream"
                        :url-sources="urlMultiple.main"
                        :force-auto-play-with-sound="true"
                    >
                        <template slot="info-layout">
                            <div class="title-layout">
                                2D
                            </div>
                        </template>
                    </video-js-player>
                </div>
                <div class="sub-wrapper">
                    <div class="item-mini">
                        <video-js-player
                            player-wrapper="mini-stream-1"
                            :url-sources="urlMultiple.sub1"
                            :force-auto-play-with-sound="true"
                            :options="subVideoConfigs"
                        >
                            <template slot="info-layout">
                                <div class="title-layout">
                                    2D
                                </div>
                            </template>
                        </video-js-player>
                    </div>
                    <div class="item-mini">
                        <video-js-player
                            player-wrapper="mini-stream-2"
                            :url-sources="urlMultiple.sub2"
                            :force-auto-play-with-sound="true"
                            :is-use360-config="true"
                            :options="subVideoConfigs"
                        >
                            <template slot="info-layout">
                                <div class="title-layout">
                                    360
                                </div>
                            </template>
                        </video-js-player>
                    </div>
                    <div class="item-mini">
                        <video-js-player
                            player-wrapper="mini-stream-3"
                            :url-sources="urlMultiple.sub3"
                            :force-auto-play-with-sound="true"
                            :is-use360-config="true"
                            :options="subVideoConfigs"
                        >
                            <template slot="info-layout">
                                <div class="title-layout">
                                    360
                                </div>
                            </template>
                        </video-js-player>
                    </div>
                </div>
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
