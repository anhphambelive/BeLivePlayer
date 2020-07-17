import {VideoJsPlayer} from 'bi-live-libs'
import PlyrPlayer from "@/components/PlyrPlayer";
import WowzaPlayer from "@/components/WowzaPlayer";
import {WOWZA_PLAYER_CONFIGS} from "@/configs/Settings";

export default {
    name: "CheckPlayer",
    mixins: [],
    components: {
        VideoJsPlayer,
        PlyrPlayer,
        WowzaPlayer
    },
    data() {
        return {
            isMultipleLayout: false,
            showLoading: false,
            reRenderComponent: 0,
            streamUrl: "",
            urlSources: [],
            usePlayer: "videojs",
            playerOptions: [
                // { value: "videojs", text: "VideoJS Player" },
                // { value: "hls", text: "HLS Player" },
                // { value: "shaka", text: "Shaka Player" },
                // { value: "wowza", text: "Wowza Player" },

                { value: "videojs", text: "Player 1" },
                { value: "hls", text: "Player 2" },
                { value: "videojs-aws", text: "Player 3" },
                { value: "videojs-360", text: "Player 4" },
                // // { value: "shaka", text: "Player 3" },
                // // { value: "wowza", text: "Player 4" },
            ],
            testingUrls: [
                `${process.env.VUE_APP_BASE_URL}/static/media/hls/hls.m3u8`,
                `https://suntec-belive-clients.belive.sg/test_360/football/playlist.m3u8`,
                `${process.env.VUE_APP_BASE_URL}/static/media/hls-2/video2.m3u8`,
                `https://suntec-belive-clients.belive.sg/test_360/playlist.m3u8`,
                "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8",
                // "https://56124c4c47e0.us-west-2.playback.live-video.net/api/video/v1/us-west-2.238231345362.channel.V08fLwnN7GgN.m3u8",
                "https://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8",
                "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://ak-texel01.akamaized.net/hls/live/2000341/test/master.m3u8?hdnea=st=1594806483~exp=1595411283~acl=/hls/live/*~hmac=0971be7041af0cc44f4696c3f5beff759243f6ee7444844711fcf5e125c4ed8d",
                `${process.env.VUE_APP_BASE_URL}/static/media/video/video-1.mp4`,
                // "http://34.84.215.47/BeLive_cam1.m3u8",
                // "http://34.84.215.47/BeLive_cam2.m3u8",
                // "http://34.84.215.47/BeLive_cam3.m3u8 ",
            ],
            wowzaPlayerOptions: {
                license: WOWZA_PLAYER_CONFIGS.LICENSE,
                sources: [
                    {
                        sourceURL: "https://belivesdk-streaming.belive.sg/liveedge/1234567890aqwertyuio/playlist.m3u8"
                    }
                ],
                title: "",
                description: "",
                autoPlay: true,
                mute: false,
                volume: 75
            },

            urlMultiple: [
                {
                    sources: [
                        "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8",
                    ],
                    is360Video: false
                },
                {
                    sources: [
                        "https://ak-texel01.akamaized.net/hls/live/2000341/test/master.m3u8?hdnea=st=1594806483~exp=1595411283~acl=/hls/live/*~hmac=0971be7041af0cc44f4696c3f5beff759243f6ee7444844711fcf5e125c4ed8d",
                    ],
                    is360Video: false
                },
                {
                    sources: [
                        // `https://suntec-belive-clients.belive.sg/test_360/football/playlist.m3u8`,
                        `${process.env.VUE_APP_BASE_URL}/static/media/hls/hls.m3u8`,
                    ],
                    is360Video: true
                },
                {
                    sources: [
                        `https://suntec-belive-clients.belive.sg/test_360/football/playlist.m3u8`,
                        // `https://suntec-belive-clients.belive.sg/test_360/playlist.m3u8`,
                        // `${process.env.VUE_APP_BASE_URL}/static/media/hls-2/video2.m3u8`
                    ],
                    is360Video: true
                }
            ],

            subVideoConfigs: {
                autoplay: true,
                loop: true,
                controls: false,
                muted: true
            },
            videoKey0: 1,
            videoKey1: 2,
            videoKey2: 3,
            videoKey3: 4,
            currentMaxKey: 4,
        };
    },
    computed: {
        iOSVersion() {
            return this.getCurrentiOsVersion();
        }
    },
    watch: {
        urlSources(val) {
            if (val.length && this.usePlayer === 'videojs-360') {
                this.$nextTick(() => {
                    this.registerEventGrantPermission();
                });
            }
        },
        usePlayer(val) {
            if (val === 'videojs-360' && this.urlSources.length) {
                this.$nextTick(() => {
                    this.registerEventGrantPermission();
                });
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        getCurrentiOsVersion() {
            var agent = window.navigator.userAgent,
                start = agent.indexOf( 'OS ' );
            if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
                return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
            }
            return 0;
        },
        async registerEventGrantPermission() {
            try {
                let buttonEl = document.getElementById(`grant-motion-access-${this.reRenderComponent}`);
                await buttonEl.addEventListener('click', this.eventGrantPermission);
            } catch (ex) {
                console.log('eval code err: ' + ex);
            }
        },
        eventGrantPermission() {
            DeviceMotionEvent.requestPermission().then(response => {
                alert('We are get the permission!, response is ' + response);
                if (response == 'granted') {
                    window.addEventListener('devicemotion', (e) => {
                        // do something with e
                    })
                }
            }).catch((e) => {
                console.log('eval code err: ' + e);
            })
        },
        startPlayVideo: function (url) {
            // this.showLoading = true;
            this.streamUrl = url;
            this.reRenderComponent++;
            if (this.usePlayer === "videojs" || this.usePlayer === "videojs-360" || this.usePlayer === "videojs-aws") {
                if (url) {
                    this.urlSources = [
                        url
                    ];
                }
            }
            else if (this.usePlayer === "wowza") {
                this.wowzaPlayerOptions = Object.assign({}, {
                    license: WOWZA_PLAYER_CONFIGS.LICENSE,
                    sources: [
                        {
                            sourceURL: url
                        }
                    ],
                    title: "",
                    description: "",
                    autoPlay: true,
                    mute: false,
                    volume: 75
                });
            }
            else {
                this.urlSources = [];
            }
        },

        toggleSwitchMainStream(index) {
            let currentMain = this.urlMultiple[0];
            let currentVideo = this.urlMultiple[index];
            this.urlMultiple[index] = currentMain;
            this.urlMultiple[0] = currentVideo;
            this.currentMaxKey++;
            this.videoKey0 = this.currentMaxKey;
        }
    },
};
