<template>
    <header class="primary-header header-custom" id="header">
        <b-navbar
            toggleable="lg"
            variant="navbar navbar-expand-lg navbar-light justify-content-center bg-primary-custom"
        >
            <a class="nav-menu-custom" href="https://tech.belive.sg/" target="_blank">
                <img
                    @click="updateKeyRoute"
                    alt
                    width="380"
                    src="../../static/media/belive.png"
                />
            </a>

            <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="navbar__item" :to="{ name: 'Home' }" active exact>Home</b-nav-item>
          <b-nav-item class="navbar__item" :to="{ name: 'Home' }" active exact>Category</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="navbar__item-right" :to="{ name: 'Home' }" active exact>Download</b-nav-item>
          <b-nav-item class="navbar__item-right" :to="{ name: 'Home' }" active exact>Recharge</b-nav-item>
          <b-nav-text class="navbar__item-right">
            <router-link :to="{ name: 'Home' }" class="navbar__item-img" exact>
              <b-img
                rounded="circle"
                width="34"
                alt="logo-circle"
                src="../../static/media/logo-small.png"
              ></b-img>
            </router-link>
          </b-nav-text>
        </b-navbar-nav>
            </b-collapse>-->
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
