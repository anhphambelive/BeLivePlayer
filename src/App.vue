<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="main main-page belive-main-page" role="main">
            <router-view
                class="view-route-partial"
                id="view-route-partial"
            />
        </div>
    </div>
</template>

<script>
import Navbar from "./sections/navbar"
import Footer from "./sections/footer"

export default {
    name: "App",
    components: {
        Navbar,
        Footer,
    },
    mixins: [],
    data() {
        return {
            keyRouter: 0,
        }
    },
    watch: {},
    computed: {

    },
    created() {
    },
    mounted() {

    },
    methods: {

    },
    beforeDestroy() {
    },
}
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
