<template>
    <div class="container-fluid container-box watch-stream suntec-watch-page">
<!--        <confirm-sign-in-modal></confirm-sign-in-modal>-->
        <text-modal :text="textModalContent"></text-modal>
        <live-video-box
            :list-user-current-join="listUserCurrentJoin"
            :list-channel-messages="listChannelMessages"
            :list-liked-animations="listLikedAnimations"
            :host-stream-info="hostStreamInfo"
            :is-mobile-layout="isMobileLayout"
            :status-live-stream="statusLiveStream"
        >
            <template v-slot:video-stream-box-slot v-if="!isKickedUser && !isMuteUser">
                <b-overlay :show="showLoading" rounded="sm" opacity="0.8">
                    <web-rtc-player
                            :stream-info="streamInfo"
                            :class="classLiveVideo"
                            v-if="usePlayer === 'web-rtc'"
                            player-wrapper="my-watch-video"
                    ></web-rtc-player>
                    <video-js-player
                            player-wrapper="my-watch-video"
                            :video-js-player-options="videoJsPlayerOptions"
                            :options="videoJsPlayerSetupOptions"
                            :stream-info="streamInfo"
                            :class="classVideoJs"
                            :key="reRenderComponent"
                            v-else-if="usePlayer === 'video-js' && videoJsPlayerOptions.urlSource"
                    ></video-js-player>
                    <plyr-player
                            player-wrapper="my-watch-video"
                            v-else-if="usePlayer === 'third-party-player'"
                            :url-source="channelStream.streamUrl"
                            :stream-info="streamInfo"
                            :is-play-stream="true"
                    ></plyr-player>
                    <template v-slot:overlay>
                        <div class="text-center">
                            <b-icon icon="three-dots" font-scale="3" animation="cylon"></b-icon>
                            <p id="cancel-label">Loading video, please wait...</p>
                        </div>
                    </template>
                </b-overlay>
            </template>

            <template v-slot:end-stream-slot>
                <div class="streaming-stopped-panel">
                    <end-screen-stream
                        :time="formatStreamTime(endResultStream.DurationTime)"
                        class="end-sdk-screen"
                    ></end-screen-stream>
                </div>
            </template>
        </live-video-box>
    </div>
</template>

<script>
import WatchStream from "../assets/js/pages/watch-stream"

export default WatchStream
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/watch-stream";
</style>
