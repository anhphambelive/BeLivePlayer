<template>
    <b-modal
        id="confirm-sign-in-modal"
        dialog-class="suntec-modal confirm-sign-in-modal"
        content-class="suntec-modal__content confirm-sign-in-modal__content"
        header-class="suntec-modal__header confirm-sign-in-modal__header"
        body-class="suntec-modal__body confirm-sign-in-modal__body"
        footer-class="suntec-modal__footer confirm-sign-in-modal__footer"
        centered
        size="sm"
        no-close-on-backdrop
        no-close-on-esc
        ref="confirmSignInModal"
        static
    >
        <template v-slot:modal-header="{ close }">
            <div class="logo-header header-login-modal text-center container-fluid">
                <b-img
                    src="../../static/media/logo.png"
                    alt="logo"
                    class="login-logo img-logo-modal"
                ></b-img>
            </div>
            <b-button
                size="sm"
                variant="outline"
                class="btn-close-modal float-right"
                @click="close()"
            >
                <b-img src="../../static/media/general/close.svg" alt="Close"></b-img>
            </b-button>
        </template>

        <template v-slot:default>
            <div class="d-block text-center">Please register or sign in to continue.</div>
        </template>
        <template v-slot:modal-footer>
            <b-button tag="a" class="btn-basic btn-navy-blue--outlined suntec-auth">REGISTER</b-button>
            <b-button tag="a" class="btn-basic btn-navy-blue suntec-auth">SIGN IN</b-button>
        </template>
    </b-modal>
</template>

<script>
import ConfirmSignInModal from "../assets/js/components/confirm-sign-in-modal"
export default ConfirmSignInModal
</script>

<style lang="scss">
@import "../assets/scss/components/button-custom";
@import "../assets/scss/components/confirm-sign-in-modal";
</style>
