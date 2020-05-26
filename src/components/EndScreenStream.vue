<template>
    <div class="bg-host-end-stream">
        <div class="bg-host-end-stream__content">
            <img
                class="bg-host-end-stream__img"
                alt="suntec-logo-end-stream"
                src="../../static/media/logo.png"
            />
            <div class="bg-host-end-stream__description">
                <p class="bg-host-end-stream__title">{{title}}</p>
                <p class="bg-host-end-stream__time">{{time}}</p>
            </div>
            <b-button
                class="btn-basic btn-basic--lg btn-navy-blue btn-exit"
                block
                @click="handleExit()"
            >Exit</b-button>
        </div>
    </div>
</template>

<script>
import EndScreenStream from "../assets/js/components/end-screen-stream"

export default EndScreenStream
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/button-custom";
@import "../assets/scss/components/end-screen-stream";
</style>
