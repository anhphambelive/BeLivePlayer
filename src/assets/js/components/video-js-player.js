import { VIDEO_PLAYER_CONFIGS, MOBILE_OS } from "../../../configs/Settings";
import HelperMixins from "./../../../mixins/HelperMixins";

export default {
    name: "VideoJsPlayer",
    mixins: [ HelperMixins ],
    props: {
        urlSources: {
            type: Array,
            default: function() {
                return [];
            }
        },
        coverImage: {
            type: String,
            default: function() {
                return "";
            }
        },
        streamInfo: {
            type: Object,
            default: function() {
                return {};
            }
        },
        playerWrapper: {
            type: String,
            default: "my-video"
        },
        options: {
            type: Object,
            default: () => ({ ...defaultOptions() })
        },
        baseUrl: {
            type: String,
            default: ""
        },
        forceAutoPlayWithSound: {
            type: Boolean,
            default: false
        },
        isUseAwsConfig: {
            type: Boolean,
            default: false
        },
        isUse360Config: {
            type: Boolean,
            default: false
        },
        isShowQualities: {
            type: Boolean,
            default: false
        },
        isAlwaysPlayLowest: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            player: null,
            retryPlayVideoNumber: 0,
            maximumRetryPlay: 3,
            showWaitingTime: 0,
            urlPlaying: null,
            indexUrlPlaying: 0,

            timeWaitingForSwitchUrl: VIDEO_PLAYER_CONFIGS.TIME_WAITING_ERROR,
            waitingForSwitchUrlJobId: null,
            isMuted: null,
            isShowMuteBtn: true,
            isPaused: null,
            isShowResumeVideo: false,
            mobileOS: MOBILE_OS,
            qualityLevels: null
        };
    },
    watch: {
        async isFullscreen(val) {
            if (!val && this.player) {
                if (this.viewerUsingMobileOS === this.mobileOS.iOS) {
                    await this.pauseVideo(false);
                    this.isShowResumeVideo = true;
                }
                else {
                    await this.resumeVideo(false);
                    this.isShowResumeVideo = false;
                }
            }
        },
    },
    computed: {
        imgCover: function() {
            return this.coverImage
                ? this.coverImage
                : "";
        },
        typeVideo: function() {
            if (!this.urlPlaying) return "";

            let extension = this.urlPlaying.split(".").pop();
            if (extension === "mp4") {
                return "video/mp4";
            } else if (extension === "m3u8") {
                return "application/x-mpegURL";
            } else if (extension === "webm") {
                return "video/webm";
            }
        },
        isFullscreen() {
            if (this.player) {
                return this.player.isFullscreen();
            }
            return false;
        },
        viewerUsingMobileOS() {
            return this.getMobileOperatingSystem();
        }
    },
    async mounted() {
        if (this.isUseAwsConfig) {
            await this.parseUrlPlaying();
            this.initialPlayerAws();
        }
        else {
            await this.parseUrlPlaying();

            await this.initialPlayer();

            // Handle event
            this.handleVideoEvents();
        }
    },
    methods: {
        // Use the player API once the player instance's ready callback is fired
        readyCallback () {
            // Get reference to Starfruit player
            const starfruitPlayer = this.player.getTwitchPlayer();

            // Expose as window variables
            this.starfruitPlayer = starfruitPlayer;

            // Show the "big play" button when the stream is paused
            const videoContainerEl = document.querySelector(`#${this.playerWrapper}`);
            videoContainerEl.addEventListener("click", () => {
                if (this.player.paused()) {
                    videoContainerEl.classList.remove("vjs-has-started");
                } else {
                    videoContainerEl.classList.add("vjs-has-started");
                }
            });

            // Logs low latency setting and latency value 5s after playback starts
            const PlayerState = this.player.getTwitchTech().PlayerState;
            this.starfruitPlayer.addEventListener(PlayerState.PLAYING, () => {
                console.log("Player State - PLAYING");
                setTimeout(() => {
                    console.log(
                        `This stream is ${
                            this.starfruitPlayer.isLiveLowLatency() ? "" : "not "
                        }playing in ultra low latency mode`
                    );
                    console.log(
                        `Stream Latency: ${this.starfruitPlayer.getLiveLatency()}s`
                    );
                }, 5000);
            });

            // Log errors
            const PlayerEventType = this.player.getTwitchTech().PlayerEventType;
            this.starfruitPlayer.addEventListener(
                PlayerEventType.ERROR,
                (type, source) => {
                    console.warn("Player Event - ERROR: ", type, source);
                }
            );

            // Log and display timed metadata
            this.starfruitPlayer.addEventListener(
                PlayerEventType.METADATA,
                (metadata) => {
                    if (metadata.type === "text/plain") {
                        const metadataText = metadata.data;
                        const position = this.starfruitPlayer.getPosition().toFixed(2);
                        console.log(
                            `Player Event - METADATA: "${metadataText}". Observed ${position}s after playback started.`
                        );
                    }
                }
            );

            // Enables manual quality selection plugin
            this.player.enableTwitchQualityPlugin();

            // Enable "Rebuffer to Live" mode to minimize latency after buffering. You will not need to call this API at GA.
            this.starfruitPlayer.setRebufferToLive(true);

            // Set volume and play default stream
            this.player.volume(0.5);
            this.player.src(this.urlPlaying);
        },
        initialPlayerAws: async function () {
            // Set up Starfruit playback tech and quality plugin
            registerTwitchTechForVideoJs(videojs);
            registerTwitchQualityPlugin(videojs);

            // Initialize video.js player
            this.player = videojs(this.playerWrapper, {
                techOrder: ["TwitchWhiteLabel"],
                controlBar: { playToggle: { replay: false } } // Hides the replay button for VOD
            });

            // Register ready callback
            this.player.ready(this.readyCallback);
        },

        /**
         *
         * @param checkShowResume
         * @returns {Promise<void>}
         */
        async resumeVideo(checkShowResume = true) {
            if (this.player) {
                await this.player.play().then(() => {
                    this.player.muted(false);
                    this.player.controls(false);

                    this.isMuted = this.player.muted();
                    this.isPaused = this.player.paused();
                    this.isShowMuteBtn = true;

                    if (checkShowResume) {
                        this.checkShowResumeByPureJS();
                    }
                });
            }
        },
        /**
         *
         * @param checkShowResume
         * @returns {Promise<void>}
         */
        async pauseVideo(checkShowResume = true) {
            if (this.player) {
                await this.player.pause();
                this.player.controls(false);
                this.isPaused = this.player.paused();
                if (checkShowResume) {
                    this.checkShowResumeByPureJS();
                }
            }
        },
        checkShowResumeByPureJS() {
            let myVideo = document.getElementById(this.playerWrapper).querySelector("video");
            if (myVideo.paused) {
                this.isShowResumeVideo = true;
            }
            else {
                this.isShowResumeVideo = false;
            }
        },
        unMuteVideo() {
            if (this.player) {
                this.player.play().then(() => {
                    this.player.muted(false);
                    this.isMuted = this.player.muted();
                });
            }
        },
        async parseUrlPlaying() {
            if (this.urlSources.length) {
                this.urlPlaying = `${this.baseUrl}${this.urlSources[this.indexUrlPlaying]}`;
            }
        },
        initialPlayer: async function() {
            try {
                this.player = videojs(this.playerWrapper, { ...defaultOptions(), ...this.options });

                this.qualityLevels = this.player.qualityLevels();
                console.log("qualityLevels", this.qualityLevels);

                // Listen to change events for when the player selects a new quality level
                this.qualityLevels.on('change', () => {
                    console.log('Quality Level changed!');
                    console.log('New level:', this.qualityLevels[this.qualityLevels.selectedIndex]);
                });

                this.player.hlsQualitySelector({
                    displayCurrentQuality: true,
                });

                if (this.forceAutoPlayWithSound) {
                    var promise = this.player.play();

                    if (promise !== undefined) {
                        promise.then(() => {
                            // Autoplay started!
                            this.player.muted(false);
                            this.isPaused = this.player.paused();
                            if (this.isPaused) {
                                this.player.muted(true);
                                this.player.play().then(() => {
                                    this.isPaused = this.player.paused();
                                    this.isMuted = this.player.muted();
                                    if (this.isPaused) {
                                        this.isShowResumeVideo = true;
                                    }
                                });
                            }
                            this.isMuted = this.player.muted();
                        }).catch((error) => {
                            // Autoplay was prevented.
                            console.log(error);
                        });
                    }
                }

                if (this.isUse360Config) {
                    if (!this.player.mediainfo) {
                        this.player.mediainfo = {};
                    }

                    if (!this.player.mediainfo.projection) {
                        this.player.mediainfo.projection = '360';
                    }

                    this.player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
                }
            } catch (e) {
                console.log("Error", e);
            }
        },
        changeQuality(index) {
            this.qualityLevels.selectedIndex_ = index;
            this.qualityLevels[index].enabled = true;
            for (let i = 0; i < this.qualityLevels.length; i++) {
                let qualityLevel = this.qualityLevels[i];
                if (i !== index) {
                    qualityLevel.enabled = false;
                } else {
                    qualityLevel.enabled = true;
                }
            }
            console.log("changed", this.qualityLevels);
        },
        async destroyPlayer() {
            if (this.player) {
                await this.player.dispose();
                this.player = null;
            }
        },
        handleVideoEvents() {
            if (!this.player)
                return ;

            let _this = this;

            this.player.on("ready", () => {
                this.isMuted = this.player.muted();
                this.isPaused = this.player.paused();

                this.player.src({
                    type: _this.typeVideo,
                    src: _this.urlPlaying
                });

                this.player.tech().on("retryplaylist", async () => {
                    this.createWaitingSwitchUrlJob();
                });

                this.player.on("timeupdate", function() {
                    _this.clearWaitingSwitchUrlJob();
                });

                this.player.on("canplay", () => {
                    this.isPaused = this.player.paused();
                    if (this.isPaused) {
                        this.isShowMuteBtn = false;
                        this.checkShowResumeByPureJS();
                    }

                    if (this.isAlwaysPlayLowest) {
                        this.$nextTick(() => {
                            let _self = this;
                            let index = this.qualityLevels.levels_.reduce((min, level, i) => {
                                return level.width <= _self.qualityLevels.levels_[min].width ? i : min;
                            }, 0);
                            console.log("Min", index);
                            this.changeQuality(index);
                        });
                    }
                });

                this.player.on("playing", () => {
                    this.clearWaitingSwitchUrlJob();
                });

                this.player.on("error", async () => {
                    this.createWaitingSwitchUrlJob();
                });

                this.player.on("fullscreenchange", function() {
                    if (_this.player.isFullscreen()) {
                        _this.$emit("onEnterFullscreen");
                    } else {
                        _this.$emit("onExitFullscreen");
                    }
                });

                this.player.reloadSourceOnError({
                    // getSource allows you to override the source object used when an error occurs
                    getSource: function(reload) {
                        console.log("Reloading because of an error");
                        // call reload() with a fresh source object
                        // you can do this step asynchronously if you want (but the error dialog will
                        // show up while you're waiting)
                        reload({
                            src: _this.urlPlaying,
                            type: _this.typeVideo
                        });
                    },
                    // errorInterval specifies the minimum amount of seconds that must pass before
                    // another reload will be attempted
                    // errorInterval: 5
                });
            });

            this.player.on("ended", function() {
                _this.$root.$emit("host-end-stream");
                this.dispose();
            });
        },
        reloadUrlSource() {
            this.player.src({
                src: this.urlPlaying,
                type: this.typeVideo
            });
        },
        async refreshNewIndexUrl() {
            let newIndex = this.indexUrlPlaying + 1;
            if (this.urlSources.length && newIndex <= this.urlSources.length - 1) {
                this.indexUrlPlaying = newIndex;
            }
            else {
                this.urlPlaying = null;
                this.$root.$emit(`reload-video-sources`);
            }
        },
        clearWaitingSwitchUrlJob() {
            if (!this.waitingForSwitchUrlJobId) {
                clearTimeout(this.waitingForSwitchUrlJobId);
                this.waitingForSwitchUrlJobId = null;
            }
        },
        createWaitingSwitchUrlJob() {
            if (!this.waitingForSwitchUrlJobId) {
                this.waitingForSwitchUrlJobId = setTimeout(async () => {
                    this.waitingForSwitchUrlJobId = null;
                    await this.refreshNewIndexUrl();
                    await this.parseUrlPlaying();
                    this.reloadUrlSource();
                }, this.timeWaitingForSwitchUrl * 1000);
            }
        },
    },
    async beforeDestroy() {
        if (this.player) {
            await this.player.dispose();
            this.player = null;
        }
    }
};

function defaultOptions() {
    return {
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
        controlBar: {
            pictureInPictureToggle: false
        },
        crossorigin: "anonymous",
        crossOrigin: "anonymous",
        loop: true,
        controls: true,
        muted: true
    };
}
