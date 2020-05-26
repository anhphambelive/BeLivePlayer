import { SDK_API } from "../../../configs/APIs";
import HelperMixins from "../../../mixins/HelperMixins";
import { STATUS_RESPONSES, STATUS_VIDEO } from "../../../configs/SDK";
import { mapGetters, mapActions } from "vuex";
import { IS_USE_SDK } from "../../../configs/Settings";
import WatchStream from "../../../pages/WatchStream"

export default {
    name: "Home",
    mixins: [HelperMixins],
    components: {
        WatchStream,
    },
    data() {
        return {
            channelKey: "",
            hostType: "audience",
            passwordChannel: "",
            loadingJoinChannel: false,
            hostOptions: [
                { item: 'host', name: 'Host' },
                { item: 'audience', name: 'Audience' },
            ],
            isUseSDK: IS_USE_SDK,

            recordCount: 5,
            recordMore: 5,
            loadingRecord: false,
            streamDetail: {},
            itemStream: {
                isEnd: true,
                nextId: 0,
                result: [
                    // {
                    //     stream: {
                    //         coverImage: "../../static/media/logo.png",
                    //         title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    //         beginStream: new Date().toISOString(),
                    //         streamId: 1,
                    //     }
                    // }
                ],
            },
            isStartedLive: false,
            showEndStream: false,
        };
    },
    computed: {
        ...mapGetters(["user", "channelStream"]),
    },
    mounted() {
        this.getStreams();
    },
    methods: {
        ...mapActions(["updateIsStartLive"]),
        getLandingPage() {
            return SDK_API.LANDING_PAGE;
        },
        watchStream(slug) {
            this.$router.push({ name: "WatchStream", params: { slug: slug } });
        },
        async onShowMoreRecord() {
            this.recordCount += this.recordMore;
            this.loadingRecord = true;
            await this.getStreams();
            this.loadingRecord = false;
        },
        getStreams() {
            return this.$http
                .post(`${SDK_API.USER_STREAMS}`, {
                    "nextId": 0,
                    "limit": this.recordCount
                }).then(response => {
                    if (response.data.code === STATUS_RESPONSES.SUCCESS) {
                        this.itemStream = { ...this.itemStream, ...response.data.data };
                        if (this.recordCount > this.itemStream.result.length) {
                            this.recordCount = this.itemStream.result.length
                        }
                        // if have LIVE:
                        if (response.data.data.result.length && response.data.data.result[0].stream.status === STATUS_VIDEO.LIVE) {
                            this.getDetailCurrentLive(response.data.data.result[0].stream.slug);
                        }
                    }
                })
        },
        getDetailCurrentLive(slug) {
            if (slug) {
                this.$http
                    .post(SDK_API.GET_DETAIL_STREAM, {
                        slug: slug,
                    }).then(response => {
                        if (response.data.code === STATUS_RESPONSES.SUCCESS) {
                            this.$store.dispatch("updateChannelStreamData", response.data.data);
                            this.isStartedLive = true
                        }
                    })
            }
        }
    }
};
