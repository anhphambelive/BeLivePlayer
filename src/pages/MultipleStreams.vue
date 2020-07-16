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
                <div class="main-wrapper">
                    <video-js-player
                        player-wrapper="main-stream"
                        :url-sources="urlSources.main"
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
                            :url-sources="urlSources.sub1"
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
                            :url-sources="urlSources.sub2"
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
                            :url-sources="urlSources.sub3"
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
    import MultipleStreams from "../assets/js/pages/multiple-streams"
    export default MultipleStreams
</script>

<style lang="scss" scoped>
    @import "../assets/scss/pages/multiple-streams";
</style>
