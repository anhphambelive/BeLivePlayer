<template>
    <div>
        <div class="card card-rounded card-chat-box bg-transparent-logged">
            <div class="card-body card-body__joined-message-box">
                <div class="list-messages-box" id="list-user-join">
                    <transition-group name="slideInFadeOut">
                        <div
                            class="item-message mb-1 mt-1"
                            :key="index"
                            v-for="(user,index) in listUserCurrentJoin"
                        >
                            <div class="message-room text bg-white message-room--text-black">
                                <span class="username username--joined">{{ user.senderDisplayName }}</span>
                                <span class="message-content" v-html="formatMessageRoom(user)"></span>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="pinned-wrapper">
                <div class="item-message-pin mb-1 mt-1" v-if="pinnedMessage">
                    <div class="message-room pinned text">
                        <span class="username">{{ pinnedMessage.senderDisplayName }}:</span>
                        <span class="message-content">{{ pinnedMessage.message }}</span>
                    </div>
                    <div class="pin-message-icon">
                        <img class="img-icon icon-pin" src="../../static/media/icons/pin.png" />
                    </div>
                </div>
            </div>
            <div class="card-body card-body__message-box">
                <!-- Animation box-->
                <div class="animation-box" ref="animationContainer" v-show="isMobileLayout">
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

                <div
                    class="list-messages-box"
                    id="list-messages-box"
                    ref="messageDisplay"
                    v-if="user"
                >
                    <div
                        class="item-message mb-1 mt-1"
                        v-bind:key="indexChatMessage"
                        v-for="(channelMessage, indexChatMessage) in listChannelMessages"
                    >
                        <div
                            :class="'message-room ' + getClassFromTypeMessage(channelMessage.messageType)"
                        >
                            <span
                                class="username"
                                :style="`color:${channelMessage.userNameColor}`"
                            >{{ channelMessage.senderDisplayName }}:</span>
                            <span
                                class="message-content"
                                v-html="formatMessageRoom(channelMessage)"
                            ></span>
                        </div>
                    </div>
                </div>
                <div class="noti-login-comment text-disabled" v-else>
                    <b-icon icon="eye"></b-icon>Log in to view comments ...
                </div>
            </div>
            <div
                class="card-footer bg-transparent d-flex align-items-center justify-content-between"
            >
                <div class="left-feature-mobile" v-if="isMobileLayout">
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

                <!-- Render condition sign-in/sign-up modal -->
                <div
                    class="action-chat-wrapper suntec-auth"
                    v-show="requiredLoginSignUpPopUp && (channelStream && !isKickedUser && !channelStream.isMute && hasPermissionChatOnRecordedVideo)"
                >
                    <b-form-textarea
                        ref="chat-input-ref"
                        :class="!user ? `form-control input-type-message bg-disabled text-disabled` : `form-control input-type-message`"
                        :disabled="!user"
                        :maxlength="maxLengthInput"
                        :placeholder="user ? 'Enter chat...' : 'Log in to comment...'"
                        @keydown="keyDownPress"
                        aria-describedby="basic-addon2"
                        aria-label="Chat"
                        type="text"
                        v-model="stringInput"
                        id="chat-input-ref"
                        :readonly="requiredLoginSignUpPopUp"
                    ></b-form-textarea>
                    <button
                        :class="!user ? `btn btn-send-message bg-disabled text-disabled` : `btn btn-send-message bg-linear-primary text-enabled`"
                        :disabled="!user"
                        type="button"
                        v-if="!isMobileLayout"
                    >Send</button>
                </div>
                <div
                    class="action-chat-wrapper"
                    v-if="!requiredLoginSignUpPopUp && (channelStream && !isKickedUser && !channelStream.isMute && hasPermissionChatOnRecordedVideo)"
                >
                    <b-form-textarea
                        ref="chat-input-ref"
                        :class="!user ? `form-control input-type-message bg-disabled text-disabled` : `form-control input-type-message`"
                        :disabled="!user"
                        :maxlength="maxLengthInput"
                        :placeholder="user ? 'Enter chat...' : 'Log in to comment...'"
                        @keydown="keyDownPress"
                        aria-describedby="basic-addon2"
                        aria-label="Chat"
                        type="text"
                        v-model="stringInput"
                        id="chat-input-ref"
                        :readonly="requiredLoginSignUpPopUp"
                    ></b-form-textarea>
                    <button
                        :class="!user ? `btn btn-send-message bg-disabled text-disabled` : `btn btn-send-message bg-linear-primary text-enabled`"
                        :disabled="!user"
                        @click="sendChannelMessageAction(stringInput)"
                        type="button"
                        v-if="!isMobileLayout"
                    >Send</button>
                </div>
                <!-- End render condition sign-in/sign-up modal -->

                <div class="right-feature-mobile" v-show="isMobileLayout">
                    <img
                        class="img-icon icon-feature icon-share"
                        src="../../static/media/icons/share.png"
                        @click="showSharingStreamModal"
                    />
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
            </div>
        </div>
    </div>
</template>

<script>
import ChatBox from "../assets/js/components/chatbox"

export default ChatBox
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";
@import "../assets/scss/components/chat-box";
</style>
