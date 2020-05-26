<template>
    <div>
        <!-- Modal copy clipboard -->
        <copy-clipboard-modal
            :title="promoModalTitle"
            :modal-id="promoModalId"
            :text-copy="channelStream.promoCode"
        ></copy-clipboard-modal>
        <div
            class="card card-rounded card-info-host bg-transparent-logged"
            id="card-info-host"
            v-if="streamInfo"
        >
            <div class="card-body" :class="isMobileLayout ? 'mobile-layout' : ''">
                <div class="row pl-sm-1">
                    <div class="col-12">
                        <div class="host-info-wrapper">
                            <div
                                class="left-avatar"
                                :class="streamInfo.userImage ? 'user-avatar' : 'default-avatar'"
                            >
                                <img
                                    :src="streamInfo.userImage ? streamInfo.userImage : '../../static/media/suntec.png'"
                                    class="avatar-host"
                                    :class="streamInfo.userImage ? 'rounded-circle' : ''"
                                />
                            </div>
                            <div class="host-streamer-info">
                                <div
                                    :title="streamInfo.displayName"
                                    class="host-streamer-name"
                                    data-placement="top"
                                    data-toggle="tooltip"
                                >{{ streamInfo.displayName }}</div>
                                <div class="static-row" v-if="streamStatistic">
                                    <div class="static-info" v-if="channelStream.isShowViewCount">
                                        {{ streamStatistic.TotalViewers }}
                                        <img
                                            class="img-icon icon-viewed"
                                            src="../../static/media/icons/eye.png"
                                        />
                                    </div>
                                    <div class="static-info" v-if="channelStream.isShowLikeCount">
                                        {{ streamStatistic.TotalLikes }}
                                        <img
                                            class="img-icon icon-liked"
                                            src="../../static/media/icons/love.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="action-unmute-wrapper">
                            <slot name="action-top-video-slot"></slot>
                        </div>
                    </div>
                    <div class="col-12">
                        <slot name="status-video-slot"></slot>
                    </div>
                </div>

                <div class="row cart-row feature-row pl-1" v-show="channelStream.cartUrl">
                    <div class="col-12">
                        <!-- Render condition sign-in/sign-up modal -->
                        <img
                            class="img-icon icon-feature icon-cart"
                            src="../../static/media/icons/cart.png"
                            @click="visitShopWebsite"
                            v-if="!requiredLoginSignUpPopUp"
                        />
                        <img
                            class="img-icon icon-feature icon-cart suntec-auth"
                            src="../../static/media/icons/cart.png"
                            v-show="requiredLoginSignUpPopUp"
                        />
                        <!-- End render condition sign-in/sign-up modal -->
                    </div>
                </div>

                <div
                    class="row redeem-row feature-row"
                    v-if="channelStream.isShowPromo || channelStream.promoCode"
                >
                    <div class="col-12">
                        <img
                            class="img-icon icon-feature icon-redeem"
                            src="../../static/media/icons/redeem.png"
                            @click="showPromoCode"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HostInfoCard from "../assets/js/components/host-info-card"

export default HostInfoCard
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/host-info-card";
</style>
