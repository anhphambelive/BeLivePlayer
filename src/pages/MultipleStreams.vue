<template>
    <div class="container-fluid belive-player-page">
        <div class="container home mt-3 mb-3">
            <b-row class="title-row">
                <b-col cols="12">
                    <h1 class="text-center mt-3 mb-1">
                        MULTIPLE STREAMS
                    </h1>
                </b-col>
            </b-row>

            <b-row class="player-wrapper-layout">
                <VideoJsPlayer
                        :override-events="['timeUpdate']"
                        :is-use-aws-config="true"
                        ref="videoJsComponent"
                        :url-sources="['https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8']"
                />
            </b-row>
        </div>
    </div>
</template>

<script>
    import MultipleStreams from "../assets/js/pages/multiple-streams"
    export default MultipleStreams
</script>

<style lang="scss" scoped>
    @import "../assets/scss/pages/multiple-streams";
</style>
