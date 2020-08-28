<template>
	<div class="container-fluid belive-player-page">
        <b-row class="text-center mt-3" :class="isFullScreenLayout ? 'd-none' : ''">
            <b-button class="switch-layout" variant="success" @click="switchLayout(!isMultipleLayout)">Change Layout To
                {{ (!isMultipleLayout) ? "Multiple Streams" : "Single Player" }}</b-button>
        </b-row>
		<div class="home mt-3 mb-3" :class="(mobileOS === MOBILE_OS.UN_KNOWN) ? 'container' : ''" v-if="!isMultipleLayout">
			<b-row class="title-row" :class="isFullScreenLayout ? 'd-none' : ''">
				<b-col cols="12">
					<h1 class="text-center mt-3 mb-1">
						BELIVE PLAYER
					</h1>
				</b-col>
			</b-row>

			<b-row class="input-url-row" :class="isFullScreenLayout ? 'd-none' : ''">
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

			<b-row class="url-testing-row" :class="isFullScreenLayout ? 'd-none' : ''">
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

			<b-row class="player-wrapper-layout" :class="isFullScreenLayout ? 'fullscreen-layout' : ''">
				<b-col cols="12" :key="reRenderComponent" class="content-wrapper" :class="isFullScreenLayout ? 'p-0' : ''">
						<VideoJsPlayer
								video-id="my-watch-video"
                                v-if="usePlayer === 'videojs' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use-aws-config="false"
                                :force-auto-play-with-sound="true"
                                :isShowQualities="true"
                                :options="videoJsOptions"
						>
                            <template slot="additional-layout" slot-scope="{ qualityLevels, changeQuality }">
                                <div class="qualities-layout text-left">
                                    <div class="quality-levels text-break" v-if="qualityLevels">
                                        <div v-for="(qualityLevel, index) in qualityLevels.levels_" v-bind:key="index" class="quality-level">
                                            <b-button :variant="qualityLevels.selectedIndex === index ? 'success' : 'secondary'" class="text-break mt-1" @click="changeQuality(index)">
                                                {{ `${qualityLevel.id}: ${qualityLevel.bitrate} kbps ${qualityLevel.width} ${qualityLevel.height}` }}
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VideoJsPlayer>
                        <VideoJsPlayer
								video-id="my-watch-video"
                                v-else-if="usePlayer === 'videojs-aws' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use-aws-config="true"
                                :force-auto-play-with-sound="true"
                                :isShowQualities="true"
                                :options="videoJsOptions"
						>
                            <template slot="additional-layout" slot-scope="{ qualityLevels, changeQuality }">
                                <div class="qualities-layout text-left">
                                    <div class="quality-levels text-break" v-if="qualityLevels">
                                        <div v-for="(qualityLevel, index) in qualityLevels.levels_" v-bind:key="index" class="quality-level">
                                            <b-button :variant="qualityLevels.selectedIndex === index ? 'success' : 'secondary'" class="text-break mt-1" @click="changeQuality(index)">
                                                {{ `${qualityLevel.id}: ${qualityLevel.bitrate} kbps ${qualityLevel.width} ${qualityLevel.height}` }}
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VideoJsPlayer>
                        <VideoJsPlayer
								video-id="my-watch-video"
                                v-else-if="usePlayer === 'videojs-360' && urlSources.length"
                                :url-sources="urlSources"
                                :is-use360-config="true"
                                ref="video360"
                                :start-from-time="startTimeFrom"
                                :force-auto-play-with-sound="true"
                                :register-button="(mobileOS === MOBILE_OS.iOS) ? registerButton : noRegisterButton"
                                :isShowQualities="true"
                :options="videoJsOptions"
						>
                            <template slot="additional-layout" slot-scope="{ qualityLevels, changeQuality }" v-if="!isFullScreenLayout">
                                <div class="additional-layout">
                                    <div class="more-actions" v-show="usePlayer === 'videojs-360' && iOSVersion >= 13">
                                        <b-button :id="`grant-motion-access-${reRenderComponent}`" variant="danger">Grant The Motion & Orientation Access</b-button>
                                    </div>
                                    <div class="guide-layout" v-if="iOSVersion >= 12 && iOSVersion < 13">
                                        <b-button v-b-toggle:guide-collapse variant="info">Guide to enable accelerometer on iOS</b-button>
                                        <b-collapse id="guide-collapse">
                                            <b-card title="Enabling accelerometer on iOS 12">
                                                To enable accelerometer on your iOS device, please go to ‘Settings’ – ‘Safari’ and enable ‘Motion & Orientation Access’.
                                                <div class="img-guide">
                                                    <b-img src="https://support.thinglink.com/hc/article_attachments/360040289774/photo_2019-07-03_13-40-38.jpg" />
                                                </div>
                                            </b-card>
                                        </b-collapse>
                                    </div>
                                    <div class="qualities-layout text-left">
                                        <div class="quality-levels text-break" v-if="qualityLevels">
                                            <div v-for="(qualityLevel, index) in qualityLevels.levels_" v-bind:key="index" class="quality-level">
                                                <b-button :variant="qualityLevels.selectedIndex === index ? 'success' : 'secondary'" class="text-break mt-1" @click="changeQuality(index)">
                                                    {{ `${qualityLevel.id}: ${qualityLevel.bitrate} kbps ${qualityLevel.width} ${qualityLevel.height}` }}
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VideoJsPlayer>
						<plyr-player
								video-id="my-watch-video"
								v-else-if="usePlayer === 'hls' || usePlayer === 'shaka'"
								:use-player="usePlayer"
								:url-source="streamUrl"
								:is-play-stream="true"
						></plyr-player>
						<wowza-player
								video-id="my-watch-video"
								v-else-if="usePlayer === 'wowza'"
								:options="wowzaPlayerOptions"
						></wowza-player>
				</b-col>
			</b-row>
		</div>

        <div class="home mt-3 mb-3" :class="(mobileOS === MOBILE_OS.UN_KNOWN) ? 'container' : ''" v-else>
            <b-row class="title-row" :class="isFullScreenLayout ? 'd-none' : ''">
                <b-col cols="12">
                    <h1 class="text-center mt-3 mb-1">
                        MULTIPLE STREAMS
                    </h1>
                </b-col>
            </b-row>

            <b-row class="player-wrapper-layout">
                <div class="main-wrapper" :class="isFullScreenLayout ? 'fullscreen-layout' : ''" :key="videoKey0">
                    <VideoJsPlayer
                        video-id="main-stream"
                        :url-sources="urlMultiple[0].sources"
                        :is-use360-config="urlMultiple[0].is360Video"
                        :force-auto-play-with-sound="true"
                        :start-from-time="startTimeFrom"
                        :options="mainVideoConfigs"
                        :register-button="(mobileOS === MOBILE_OS.iOS && urlMultiple[0].is360Video) ? registerButton : noRegisterButton"
                    >
                        <template slot="pre-layout">
                            <div class="info-layout">
                                {{ (urlMultiple[0].is360Video) ? "360" : "2D" }}
                            </div>
                        </template>
                    </VideoJsPlayer>
                </div>
                <div class="sub-wrapper" :class="isFullScreenLayout ? 'd-none' : ''">
                    <div class="item-mini" :key="videoKey1">
                        <VideoJsPlayer
                            video-id="mini-stream-1"
                            :url-sources="urlMultiple[1].sources"
                            :options="subVideoConfigs"
                            :is-use360-config="urlMultiple[1].is360Video"
                            :is-always-play-lowest="true"
                        >
                            <template slot="pre-layout">
                                <div class="info-layout">
                                    {{ (urlMultiple[1].is360Video) ? "360" : "2D" }}
                                </div>
                            </template>

                            <template slot="overlay-layout">
                                <div v-show="false"></div>
                            </template>

                            <template slot="additional-layout">
                                <div class="actions-layout">
                                    <b-icon-arrows-fullscreen
                                        @click="toggleSwitchMainStream(1); currentMaxKey++; videoKey1 = currentMaxKey"
                                        v-b-tooltip.hover
                                        title="Switch to main stream">
                                    </b-icon-arrows-fullscreen>
                                </div>
                            </template>
                        </VideoJsPlayer>
                    </div>
                    <div class="item-mini" :key="videoKey2">
                        <VideoJsPlayer
                            video-id="mini-stream-2"
                            :url-sources="urlMultiple[2].sources"
                            :is-use360-config="urlMultiple[2].is360Video"
                            :options="subVideoConfigs"
                            :is-always-play-lowest="true"
                        >
                            <template slot="pre-layout">
                                <div class="info-layout">
                                    {{ (urlMultiple[2].is360Video) ? "360" : "2D" }}
                                </div>
                            </template>
                            <template slot="overlay-layout">
                                <div v-show="false"></div>
                            </template>
                            <template slot="additional-layout">
                                <div class="actions-layout">
                                    <b-icon-arrows-fullscreen
                                        @click="toggleSwitchMainStream(2); currentMaxKey++; videoKey2 = currentMaxKey"
                                        v-b-tooltip.hover
                                        title="Switch to main stream">
                                    </b-icon-arrows-fullscreen>
                                </div>
                            </template>
                        </VideoJsPlayer>
                    </div>
                    <div class="item-mini" :key="videoKey3">
                        <VideoJsPlayer
                            video-id="mini-stream-3"
                            :url-sources="urlMultiple[3].sources"
                            :is-use360-config="urlMultiple[3].is360Video"
                            :options="subVideoConfigs"
                            :is-always-play-lowest="true"
                        >
                            <template slot="pre-layout">
                                <div class="info-layout">
                                    {{ (urlMultiple[3].is360Video) ? "360" : "2D" }}
                                </div>
                            </template>
                            <template slot="overlay-layout">
                                <div v-show="false"></div>
                            </template>
                            <template slot="additional-layout">
                                <div class="actions-layout">
                                    <b-icon-arrows-fullscreen
                                        @click="toggleSwitchMainStream(3); currentMaxKey++; videoKey3 = currentMaxKey"
                                        v-b-tooltip.hover
                                        title="Switch to main stream">
                                    </b-icon-arrows-fullscreen>
                                </div>
                            </template>
                        </VideoJsPlayer>
                    </div>
                </div>
                <div class="show-guide-layout" :class="isFullScreenLayout ? 'd-none' : ''">
                    <div class="additional-layout">
                        <div class="more-actions" v-show="iOSVersion >= 13">
                            <b-button :id="`grant-motion-access-${reRenderComponent}`" variant="danger">Grant The Motion & Orientation Access</b-button>
                        </div>
                        <div class="guide-layout" v-if="iOSVersion >= 12 && iOSVersion < 13">
                            <b-button v-b-toggle:guide-collapse variant="info">Guide to enable accelerometer on iOS</b-button>
                            <b-collapse id="guide-collapse">
                                <b-card title="Enabling accelerometer on iOS 12">
                                    To enable accelerometer on your iOS device, please go to ‘Settings’ – ‘Safari’ and enable ‘Motion & Orientation Access’.
                                    <div class="img-guide">
                                        <b-img src="https://support.thinglink.com/hc/article_attachments/360040289774/photo_2019-07-03_13-40-38.jpg" />
                                    </div>
                                </b-card>
                            </b-collapse>
                        </div>
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
