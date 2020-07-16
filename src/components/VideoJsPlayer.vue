<template>
    <div class="video-js-player-wrapper" v-if="urlSources.length && urlPlaying">
        <slot name="info-layout">
        </slot>
        <video
            :id="playerWrapper"
            :poster="imgCover"
            class="video-js video-center vjs-big-play-centered"
            oncontextmenu="return false;"
            preload="auto"
            ref="videoPlayer"
            playsinline
            controls
            autoplay
            webkit-playsinline
        >
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a
                    href="https://videojs.com/html5-video-support/"
                    target="_blank"
                >supports HTML5 video</a>
            </p>
        </video>
        <slot name="overlay-layout">
            <div class="video-js-player-wrapper__state-video-actions">
                <b-button
                    class="ml-3 unmute-stream-init-btn"
                    variant="light"
                    @click="unMuteVideo()"
                    v-b-tooltip.hover
                    title="Un-mute Stream"
                    v-if="isMuted && isShowMuteBtn"
                >
                    <b-img src="static/media/icons/no-sound.svg" alt="mute-unmute"></b-img>
                    {{ (viewerUsingMobileOS === mobileOS.UN_KNOWN) ? 'Click' : 'Tap' }} to unmute
                </b-button>
            </div>
            <div class="quality-levels text-break" v-if="isShowQualities && qualityLevels">
                <div v-for="(qualityLevel, index) in qualityLevels.levels_" v-bind:key="index" class="quality-level">
                    <b-button :variant="qualityLevels.selectedIndex === index ? 'success' : 'secondary'" class="mt-1" @click="changeQuality(index)">
                        {{ `${qualityLevel.id}: ${qualityLevel.bitrate} kbps ${qualityLevel.width} ${qualityLevel.height}` }}
                    </b-button>
                </div>
            </div>
        </slot>
        <slot name="actions-layout">
        </slot>
    </div>
</template>

<script>
    import VideoJsPlayer from "../assets/js/components/video-js-player";

    export default VideoJsPlayer;
</script>

<style lang="scss">
    @import "../assets/scss/components/video-js-player";
</style>
