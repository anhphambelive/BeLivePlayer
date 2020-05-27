<template>
    <header class="primary-header header-custom" id="header">
        <b-navbar
            toggleable="lg"
            variant="navbar navbar-expand-lg navbar-light justify-content-center bg-primary-custom"
        >
            <a class="nav-menu-custom" href="https://tech.belive.sg/" target="_blank">
                <img
                    alt
                    width="380"
                    src="../../static/media/belive.png"
                />
            </a>
        </b-navbar>
    </header>
    <!-- /header -->
</template>

<script>
import Navbar from "../assets/js/sections/navbar"

export default Navbar
</script>

<style lang="scss">
@import "../assets/scss/sections/navbar";
</style>
