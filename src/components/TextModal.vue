<template>
	<b-modal
			id="text-modal"
			dialog-class="suntec-modal text-modal"
			content-class="suntec-modal__content text-modal__content"
			header-class="suntec-modal__header text-modal__header"
			body-class="suntec-modal__body text-modal__body"
			footer-class="suntec-modal__footer text-modal__footer"
			centered
			size="sm"
			no-close-on-backdrop
			no-close-on-esc
	>
		<template v-slot:modal-header="{ close }">
			<div class="logo-header header-login-modal text-center container-fluid">
				<b-img src="../../static/media/logo.png" alt="logo" class="login-logo img-logo-modal"></b-img>
			</div>
<!--			<b-button size="sm" variant="outline" class="btn-close-modal float-right">-->
<!--				<b-img src="../../static/media/general/close.svg" alt="Close" @click="close()"></b-img>-->
<!--			</b-button>-->
		</template>

		<template v-slot:default>
			<div class="d-block text-center">{{ text }}</div>
		</template>
		<template v-slot:modal-footer>
			<b-button class="btn-basic btn-navy-blue" @click="$bvModal.hide('text-modal')">OK</b-button>
		</template>
	</b-modal>
</template>

<script>
	import TextModal from "../assets/js/components/text-modal";
	export default TextModal;
</script>

<style lang="scss">
	@import "../assets/scss/components/button-custom";
	@import "../assets/scss/components/text-modal";
</style>