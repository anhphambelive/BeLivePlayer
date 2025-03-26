<template>
    <div id="app">
       <div class="chat-box">
          <VideoJsPlayer 
             video-id="mini-stream-2"
             :url-sources="videoData.sources"
             :options="videoData.options"
             :is-always-play-lowest="true"
             :isClickShowBigPlayLayout="false"
             :query-params="videoData.queryParams"
             :isAddQueryPerRequest="true"
          />
       </div>
    </div>
 </template>
 
 <script>
 import { VideoJsPlayer } from 'bi-live-libs'
 export default {
    name: "DemoPlayer",
    components: {
       VideoJsPlayer
    },
    data() {
       return {
          user: null,
          channel: "2c2b1d280ad44cdaaad07d4bdef3554d",
          tencent: {
             appId: 20020391,
          },
          host: {
             channel: "biphamroomannj",
             uid: '7749',
             userName: 'bipham',
             displayName: `HyperLive`,
             token: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwkmZBRmJuVCZ4pTsxIKCzBQlKyMDAyMDY0tDiHhqRUFmUaqSlaGFgYEBRKgkMxckYG5iZGJqbmFgATUgMx1opqOPb0lIVqlfdr5-boSXR4Vrkkl5ebBlVn5ZZnKio2OFW4ZXmlNZgKtlkaOtUi0AsloxmQ__',
             avatar: '',
             score: 0
          },
          remainingMuteTime: 0,
          isLoggedInRtm: false,
          isStarted: false,
          messages: [],
          videoData: {
             sources: [
                // 'https://lora-vod-dev.belive.sg/c8462b1dvodtranssgp1500016718/e44cd2f31397757907095962026/adp.1577041.m3u8?t=67e28790&us=ba7abecc9b5e4150bbe89e5fef3d801f&sign=cbbdc702f9d1c3ec8f63b4a368988f8a',
                // 'https://ivs-lora-dev-eu-west-1.belive.sg/show_videos_private/cc9058a8892146d6ba11aaca35b509c8.mp4?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaXZzLWxvcmEtZGV2LWV1LXdlc3QtMS5iZWxpdmUuc2cvc2hvd192aWRlb3NfcHJpdmF0ZS9jYzkwNThhODg5MjE0NmQ2YmExMWFhY2EzNWI1MDljOC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDI5MDI3ODR9fX1dfQ__&Signature=gCe-0AiRGxhYLM4cD4LqRPB1F26OKnRItJWF5zzyCVk~yAXlJCO1YiUo~iyJrHnAu2PEWtLUKqHmj~fFy1TAqsQC45AZjZDzZwKNRRhaHSXPdG1v-Gzr~avvKPy8fIwJn8yshJPSpuggs6pqtjEfVnL3c79Pygm7xu-Io~ANG4n9itBipFhCxyyjoPCC7HK1KrN3IiWnEu19zBPVXJFgjTwXArNVWJVIk9nfXkR~fMEpjZFSfghWfPGcKLHjwAA2mAdcWAOfZoOSPOLlXdID6Lvd807i~6hPXdTcgZQ1N7XIxB34v~kJLh7XHo4Be8YRtxtZQagYOmqJqeufdITG3g__&Key-Pair-Id=K1KIK5K95YW1AG',
                // 'https://ivs-lora-dev-eu-west-1.belive.sg/show_videos_private/show_videos/72/2024/9/30/cc9058a8892146d6ba11aaca35b509c8/hls.m3u8?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaXZzLWxvcmEtZGV2LWV1LXdlc3QtMS5iZWxpdmUuc2cvc2hvd192aWRlb3NfcHJpdmF0ZS9zaG93X3ZpZGVvcy83Mi8yMDI0LzkvMzAvY2M5MDU4YTg4OTIxNDZkNmJhMTFhYWNhMzViNTA5YzgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0MjkwMzA1Mn19fV19&Signature=EgKHFap0PDKDT26L3hwrn32snyxrwbWKpXwpwAY7Y~vxsybbdg0Rbqzfqz9HtBjXaMrUXSKoIYMt2-k~FWWCJSaXdTK6Vw858SBsfEEml6ovg4FLoHyfLb7wgXC9WFwNk7LBx7bRx-TOZtRyMSKC1QjzqAqqPDkl6m870y6FU9bRmq-XXZ3nzpTEXwgFFu1Rz8sQG07AL7eX~gHnJEuIMBp3SDltaSuItsTrzRpBgCcouHiMszFXx4beyVuHbO8kCK4uwc3MXCfCpu7NqUhWinoyUKBVlNhrgWoYpQpO-IZKtC9jSDEtdsjm5lPqURX0yoDp~ZmN3ktFkrGo4LmXbg__&Key-Pair-Id=K1KIK5K95YW1AG',
                'https://ivs-lora-dev-eu-west-1.belive.sg/show_videos_private/show_videos/72/2024/9/30/cc9058a8892146d6ba11aaca35b509c8/hlsfile_1.m3u8'
             ],
             options: {
                autoplay: true,
                loop: true,
                controls: false,
                muted: true,
             },
             queryParams: [
                {
                   'Policy': 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaXZzLWxvcmEtZGV2LWV1LXdlc3QtMS5iZWxpdmUuc2cvc2hvd192aWRlb3NfcHJpdmF0ZS9zaG93X3ZpZGVvcy83Mi8yMDI0LzkvMzAvY2M5MDU4YTg4OTIxNDZkNmJhMTFhYWNhMzViNTA5YzgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0MjkwMzA1Mn19fV19',
                },
                {
                   'Signature': 'EgKHFap0PDKDT26L3hwrn32snyxrwbWKpXwpwAY7Y~vxsybbdg0Rbqzfqz9HtBjXaMrUXSKoIYMt2-k~FWWCJSaXdTK6Vw858SBsfEEml6ovg4FLoHyfLb7wgXC9WFwNk7LBx7bRx-TOZtRyMSKC1QjzqAqqPDkl6m870y6FU9bRmq-XXZ3nzpTEXwgFFu1Rz8sQG07AL7eX~gHnJEuIMBp3SDltaSuItsTrzRpBgCcouHiMszFXx4beyVuHbO8kCK4uwc3MXCfCpu7NqUhWinoyUKBVlNhrgWoYpQpO-IZKtC9jSDEtdsjm5lPqURX0yoDp~ZmN3ktFkrGo4LmXbg__'
                },
                {
                   'Key-Pair-Id': 'K1KIK5K95YW1AG'
                }
             ]
          }
       };
    },
    computed: {
       
    },
    watch: {
      
    },
    beforeDestroy() {
    },
    methods: {
       reachLimitSender() {
          alert("Muting user");
       },
       updateRemainingMuteTime(remaingTime) {
          this.remainingMuteTime = remaingTime // seconds
       },
       loggedInRtm() {
          this.isLoggedInRtm = true
       },
       startChat() {
          this.isStarted = true
       },
       updateTextMessages(messages) {
          this.messages = messages;
          console.log("test messages", messages)
       }
    },
    mounted() {
       let randomId = parseInt(Math.random() * 1000);
       let i = Math.round(Math.random() * 17);
       this.user = {
          userName: `Test-${randomId}`,
          userId: randomId,
          // avatarColor: BG_COLORS[i],
          displayName: `Test-${randomId}`,
          levelVip: 4,
          level: 1,
          userImage: "https://dev-wakelearning-clients.belive.sg/profile_image/baodang2222.jpg?t=637406654560000000",
       };
    }
 };
 </script>
 
 <style lang="scss">
 html,
 body {
    width: 100vw;
    min-height: 100vh;
    background-color: #cccc;
 }
 #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
 
    .chat-box {
       width: calc(100% - 40px);
       padding: 0 20px;
       text-align: left;
 
       &.fullscreen-layout {
          width: 100%;
       }
    }
 }
 
 .video-js button.vjs-fullscreen-enter-button {
    font-size: 17px;
    cursor: pointer;
 }
 
 #viewBoxPlayer {
    .chat-in-view {
       width: 80%;
       display: inline-block;
    }
 
    .append-actions {
       display: inline-block;
       padding: 1rem;
       .btn {
          margin-right: 5px;
          cursor: pointer;
          &:last-child {
             margin-right: unset;
          }
       }
    }
 }
 
 .hover-overlay {
    z-index: 10;
     position: absolute;
     top: 0;
     right: 0;
     /* width: 100%; */
     /* height: 100%; */
     border-radius: 14px;
     cursor: pointer;
 }
 
 .quality-levels {
     position: relative;
     z-index: 9999;
     cursor: pointer;
 }
 
 .agora-test-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .form-wrapper {
          display: flex;
          width: calc(100% - 40px);
          justify-content: center;
          padding: 10px 20px;
          background-color: #40bb4f;
    }
    .form-group {
       width: 100%;
       align-items: flex-start;
       display: flex;
       flex-direction: column;
    }
    .title {
       color: #2b333f;
       font-size: 30px;
       font-weight: 800;
       margin-bottom: 10px;
    }
    .forms {
       display: flex;
       flex-direction: column;
       align-items: flex-start;
    }
    .label-item {
       margin-right: 10px;
       font-weight: 900;
       color: #2d2d2d;
       width: 300px;
    }
    .actions {
     margin: 20px 0;
     .btn {
        margin: 0 10px;
        cursor: pointer;
     }
 }
 .video {
     height: 480px;
     width: 100%;
     margin-top: 20px;
     position: relative;
     .vlw__video__live {
       border: 2px solid #ea3d54;
    }
    .count-down {
       position: absolute;
       top: 0;
       left: 0;
       margin: 0 auto;
       background: #ea3d54;
       z-index: 2;
       padding: 5px 10px;
       color: #2b333f;
       font-weight: 800;
    }
    .video-overlay-layout {
       position: absolute;
       top: 0;
    }
 }
 .duration {
     margin: 10px 0;
 }
 }
 
 #chatWrapper {
     height: 300px;
     overflow: auto;
     .middle-wrapper {
        height: calc(100% - 110px);
     }
 }
 </style>
 