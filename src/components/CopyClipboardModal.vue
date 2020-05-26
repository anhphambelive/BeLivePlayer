<template>
    <b-modal
        :id="modalId"
        dialog-class="copy-clipboard-modal"
        content-class="copy-clipboard-modal__content"
        header-class="copy-clipboard-modal__header"
        body-class="copy-clipboard-modal__body"
        footer-class="copy-clipboard-modal__footer"
        centered
        size="sm"
        no-close-on-backdrop
        no-close-on-esc
        @hidden="reset()"
    >
        <template v-slot:modal-header="{ close }">
            <div class="text-center container-fluid">
                <div class="d-block text-center copy-clipboard-modal__title">{{title}}</div>
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
            <b-input
                :id="modalId + '-text-copy-input'"
                class="copy-clipboard-modal__input"
                :value="textCopy"
                readonly
            ></b-input>
        </template>
        <template v-slot:modal-footer>
            <b-tooltip
                target="button-copy"
                placement="bottom"
                :title="textCopied ? 'Copied to clipboard' : 'Copy to clipboard'"
            ></b-tooltip>
            <b-button
                id="button-copy"
                class="btn-basic btn-basic--lg btn-navy-blue--outlined"
                @click="handleCopy()"
            >Copy Link</b-button>
        </template>
    </b-modal>
</template>

<script>
import CopyClipboardModal from "../assets/js/components/copy-clipboard-modal"
export default CopyClipboardModal
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/button-custom";
@import "../assets/scss/components/copy-clipboard-modal";
</style>
