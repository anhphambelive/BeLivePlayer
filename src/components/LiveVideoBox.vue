<template>
    <div v-if="statusLiveStream === statusLiveStreamConfigs.END">
        <slot name="end-stream-slot"></slot>
    </div>
    <div class="row row-live-video-wrapper" v-else>
        <!-- Modal copy clipboard -->
        <copy-clipboard-modal
            :title="sharingModalTitle"
            :modal-id="sharingModalId"
            :text-copy="urlSharingStream"
        ></copy-clipboard-modal>
        <div
            ref="sideRightWrapper"
            class="side-right-wrapper"
            :class="(isMobileLayout ? 'col-md-12' : 'col-md-3')"
            @click="handleChangeClassAttr()"
        >
            <HostInfoCard
                :stream-info="hostStreamInfo"
                :is-mobile-layout="isMobileLayout"
                v-if="hostStreamInfo"
            >
                <template
                    v-slot:status-video-slot
                    v-if="statusLiveStream === statusLiveStreamConfigs.STREAMING"
                >
                    <div class="label-status-stream">
                        <b-badge variant="danger" class="live-badge">LIVE</b-badge>
                    </div>
                </template>

                <template v-slot:action-top-video-slot>
                    <b-button
                        class="unmute-stream-init-btn"
                        variant="light"
                        @click="unMuteStream"
                        id="unmute-stream-init-btn"
                        v-if="!isHideUnMuteFeature"
                    >
                        <b-img src="../../static/media/icons/no-sound.svg" alt="mute-unmute"></b-img>
                        {{ (!isMobileLayout) ? 'Click' : 'Tap' }} to unmute
                    </b-button>
                </template>
            </HostInfoCard>
            <ChatBox
                :list-user-current-join="listUserCurrentJoin"
                :list-channel-messages="listChannelMessages"
                :list-liked-animations="listLikedAnimations"
                :is-mobile-layout="isMobileLayout"
                ref="chatContainer"
            ></ChatBox>
        </div>
        <div class="side-center-wrapper" :class="isMobileLayout ? 'col-md-12' : 'col-md-6'">
            <slot name="video-stream-box-slot"></slot>
        </div>
        <div
            class="side-left-wrapper"
            :class="isMobileLayout ? 'col-md-12' : 'col-md-3'"
            v-show="!isMobileLayout"
        >
            <div class="row left-feature">
                <div class="item-feature col-md-4">
                    <!-- Render condition sign-in/sign-up modal -->
                    <img
                            class="img-icon icon-feature icon-shop suntec-auth"
                            src="../../static/media/icons/shop.png"
                            v-show="requiredLoginSignUpPopUp && streamProducts.length"
                    />
                    <img
                            class="img-icon icon-feature icon-shop"
                            src="../../static/media/icons/shop.png"
                            @click="openShop"
                            v-if="!requiredLoginSignUpPopUp && streamProducts.length"
                    />
                    <!-- End render condition sign-in/sign-up modal -->
                </div>

                <div class="item-feature col-md-4">
                    <!-- Animation box-->
                    <div class="animation-box" ref="animationContainer" v-show="!isMobileLayout">
                        <transition-group
                            name="flying-heart"
                            tag="div"
                            v-on:after-enter="enterLikeTransition"
                        >
                            <heart
                                v-for="(likeAnimation, indexAnimation) in listLikedAnimations"
                                v-bind:key="indexAnimation"
                                :bg-class-animation="likeAnimation.bgClassAnimation"
                                :animation-class="likeAnimation.animationClass"
                            ></heart>
                        </transition-group>
                    </div>
                    <!-- End animation box-->

                    <!-- Render condition sign-in/sign-up modal -->
                    <img
                            class="img-icon icon-feature icon-heart"
                            src="../../static/media/icons/heart.png"
                            v-if="!requiredLoginSignUpPopUp && (channelStream && !isKickedUser && !channelStream.isMute)"
                            @click="clickLikeStream(channelStream.isLike)"
                    />
                    <img
                            class="img-icon icon-feature icon-heart suntec-auth"
                            src="../../static/media/icons/heart.png"
                            v-show="requiredLoginSignUpPopUp && (channelStream && !isKickedUser && !channelStream.isMute)"
                    />
                    <!-- End render condition sign-in/sign-up modal -->
                </div>

                <div class="item-feature col-md-4" v-if="channelStream">
                    <img
                        class="img-icon icon-feature icon-share"
                        src="../../static/media/icons/share.png"
                        @click="showSharingStreamModal"
                    />
                </div>
            </div>
        </div>
        <transition name="slideInUp">
            <list-stream-products
                :class="isMobileLayout ? 'col-md-12' : 'col-md-6 offset-md-3'"
                v-show="streamProducts.length && isShowStreamProducts"
            ></list-stream-products>
        </transition>
    </div>
</template>

<script>
import LiveVideoBox from "../assets/js/components/live-video-box"

export default LiveVideoBox
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";
@import "../assets/scss/components/live-video-box";
</style>
