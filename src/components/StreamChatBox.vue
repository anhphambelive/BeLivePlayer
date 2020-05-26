<template>
	<div class="card card-rounded card-stream-chat-box bg-transparent-logged">
		<div class="card-header">
			<div class="content-header-row row">
				<div class="host-room">
					{{ hostStreamInfo ? hostStreamInfo.displayName + '’s' : '' }} Room
				</div>
				<div class="col tab-switch chat-tab" v-if="!isWaitingScreen">
					<div class="action-switch-tab">
						<b-img class="icon-tab" alt="Chat Tab"
							   @click="switchLayoutChatBox(chatBoxLayouts.CHAT)"
							   :src="(currentLayout === chatBoxLayouts.CHAT) ? '../../static/media/icons/speech-bubble.svg' : '../../static/media/icons/speech-bubble-gray.svg'">
						</b-img>
					</div>
				</div>
				<div class="col tab-switch watching-tab" v-if="!isWaitingScreen">
					<div class="action-switch-tab watching-menu" :class="(currentLayout === chatBoxLayouts.WATCHING_USERS) ? 'active' : ''">
						<b-img class="icon-tab" alt="Users Tab"
						       @click="switchLayoutChatBox(chatBoxLayouts.WATCHING_USERS)"
						       :src="(currentLayout === chatBoxLayouts.WATCHING_USERS) ? '../../static/media/icons/team.svg' : '../../static/media/icons/team-black.svg'">
						</b-img>
						<span class="number-watching">
							{{ listWatching.length }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card-body">
			<!-- End animation box-->
			<div class="hide-chat" v-if="isWaitingScreen || isLockedRoom">

			</div>
			<div class="list-messages-box" id="list-messages-box" ref="messageDisplay" v-else-if="user && (currentLayout === chatBoxLayouts.CHAT)">
				<div class="item-message mb-1 mt-1" v-bind:key="indexChatMessage" v-for="(channelMessage, indexChatMessage) in listChannelMessages">
					<div :class="'message-room ' + getClassFromTypeMessage(channelMessage.message_type)">
			            <span class="username">
				            {{ channelMessage.sender_display_name }}:
			            </span>
						<span class="message-content" v-html="formatMessageRoom(channelMessage)"></span>
					</div>
				</div>
			</div>
			<div class="list-watching-users" v-else-if="user && (currentLayout === chatBoxLayouts.WATCHING_USERS)">
				<div class="user-watching" v-bind:key="indexUserWatching" v-for="(userWatching, indexUserWatching) in listWatching">
					<div class="avatar" v-bind:style="{ background: ((!userWatching.sender_avatar_url && userWatching.avatar_color) ? userWatching.avatar_color : '') }">
						<b-img :src="userWatching.sender_avatar_url" :alt="userWatching.display_name" v-if="userWatching.sender_avatar_url"></b-img>
						<span class="first-character-name" v-else>
							{{ userWatching.display_name.charAt(0) }}
						</span>
					</div>
					<div class="display-name" :class="(!userWatching.sender_avatar_url) ? 'display-name-without-avatar' : ''">
						<!--{{ userWatching.username }}-->
						{{ userWatching.display_name }}
					</div>
					<div class="action-user-watching" v-if="!isViewMode && (hostStreamInfo.userName !== userWatching.username)">
						<span class="kick-user-action action" @click="forceUserLeaveRoom(userWatching)">
							Leave room
						</span>
						<span class="muted-user-action action" @click="toggleMuteChatUser(userWatching.username, parseInt(userWatching.status), indexUserWatching)"
								v-b-tooltip.hover :title="((parseInt(userWatching.status) === statusMember.DISABLED) || (parseInt(userWatching.status) === statusMember.ONLY_RECEIVE)) ? 'Un-mute user' : 'Mute user'"
						>
							<b-img :src="((parseInt(userWatching.status) === statusMember.DISABLED) || (parseInt(userWatching.status) === statusMember.ONLY_RECEIVE)) ? '../../static/media/icons/no-sound.svg' : '../../static/media/icons/volume.svg'" alt="mute-unmute"></b-img>
						</span>
					</div>
				</div>
			</div>
			<div class="noti-login-comment text-disabled" v-else>
				<b-icon icon="eye"></b-icon>
				Log in to view comments ...
			</div>
		</div>
		<div class="card-footer bg-transparent">
			<div class="send-to-option" v-if="chatModes && !isViewMode">
				<div class="basic-text">
					To:
				</div>
				<div class="option-send">
					<b-dropdown id="dropdown-mode-chat" size="sm" :text="currentChatMode" variant="primary" class="m-2">
						<b-dropdown-header id="dropdown-header-label" v-if="chatModeHeader">
							{{ chatModeHeader }}
						</b-dropdown-header>
						<b-dropdown-item v-bind:key="indexMode"  v-for="(chatMode, indexMode) in chatModes" @click="switchChatMode(chatMode, indexMode)">
							<div class="selected-item item-option-chat-mode" v-if="currentChatMode === chatMode">
								<font-awesome-icon :icon="['fas', 'check']" />
								{{ chatMode }}
							</div>
							<div class="item-option-chat-mode" v-else>
								{{ chatMode }}
							</div>
						</b-dropdown-item>
					</b-dropdown>
				</div>
			</div>
			<div class="send-action">
				<textarea
						:class="
	          !user
	            ? `form-control input-type-message bg-disabled text-disabled`
	            : `form-control input-type-message`
	        "
						:disabled="disableChat"
						:maxlength="maxLengthInput"
						:placeholder="user ? 'Type something' : 'Log in to comment...'"
						@keydown="keyDownPress"
						aria-describedby="basic-addon2"
						aria-label="Chat"
						type="text"
						v-model="stringInput"
				></textarea>
				<button
						:class="
	          !user
	            ? `btn btn-send-message bg-disabled text-disabled`
	            : `btn btn-send-message bg-linear-primary text-enabled`
	        "
						:disabled="disableChat"
						@click="sendChannelMessage(stringInput)"
						type="button"
				>
					Send
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import StreamChatBox from "../assets/js/components/stream-chat-box";
	export default StreamChatBox;
</script>

<style lang="scss">
	@import "../assets/scss/components/stream-chat-box";
</style>
