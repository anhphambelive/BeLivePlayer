<template>
	<div class="be-password-field">
		<div class="input-group">
			<div class="input-group-prepend" v-if="!hidePrepend">
				<div class="input-group-text">{{ label }}</div>
			</div>
			<input
					:type="passwordFieldType"
					:value="value"
					@input="change($event.target.value)"
					@keydown="keyDownPress"
					@keyup="keyUpPress"
					class="input-border-secondary form-control input-password text-input"
					:class="classInput"
					autocomplete="off"
					:autofocus="autofocus"
					ref="passwordInput"
					:placeholder="placeholder"
			/>
			<div
					@click="showHidePassword"
					class="input-group-append append-icon-show" :class="classGroupAppend"
			>
				<div class="password-show-hide">
					<slot name="password-field" v-if="passwordFieldType === 'password'">
						<b-icon icon="eye-slash-fill"></b-icon>
					</slot>
					<slot name="text-field" v-if="passwordFieldType === 'text'">
						<b-icon icon="eye-fill"></b-icon>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BePasswordField from "../assets/js/components/be-password-field";

	export default BePasswordField;
</script>

<style lang="scss" scoped="false">
	@import "../assets/scss/components/be-password-field";
</style>
