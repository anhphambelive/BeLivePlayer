import {VideoJsPlayer} from 'bi-live-libs'
const BASE_URL = 'http://beliveplayer.belive.sg';

export default {
    name: "MultipleStreams",
    mixins: [],
    components: {
        VideoJsPlayer
    },
    data() {
        return {
            urlSources: {
                main: [
                    "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8",
                ],
                sub1: [
                    "http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8",
                ],
                sub2: [
                    `${BASE_URL}/static/media/hls/hls.m3u8`
                ],
                sub3: [
                    `${BASE_URL}/static/media/hls-2/video2.m3u8`
                ],
            },

            subVideoConfigs: {
                autoplay: true,
                preload: "auto",
                html5: {
                    hls: {
                        overrideNative: !videojs.browser.IS_SAFARI
                    },
                    nativeAudioTracks: false,
                    nativeVideoTracks: false,
                    // withCredentials: true
                },
                crossorigin: "anonymous",
                crossOrigin: "anonymous",
                loop: true,
                controls: false,
                muted: false
            }
        };
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    mounted() {

    },
    methods: {

    },
};
