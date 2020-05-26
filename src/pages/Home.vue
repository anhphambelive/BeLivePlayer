<template>
    <div>
        <div class="container-fluid home belive-home-page" v-if="!isStartedLive">
            <div class="bg-solid"></div>
            <div class="row content-page">
                <div
                    :class="`${!itemStream.result.length ? 'offset-md-2 col-md-8' : 'col-md-7 col-lg-8'} col-sm-12 main-content`"
                >
                    <div class="row justify-content-center align-items-center main-banner">
                        <img class="main-banner__lg" alt="banner-lg" :src="getLandingPage()" />
                        <img
                            class="main-banner__sm"
                            alt="banner-sm"
                            :src="getLandingPage() || '../../static/media/logo-medium.png'"
                        />
                    </div>
                </div>
                <div v-if="itemStream.result.length" class="col-lg-4 col-md-5 col-sm-12 main-list">
                    <div class="list-record">
                        <div class="list-record__header">Replay</div>
                        <div class="list-record__content">
                            <b-card
                                no-body
                                class="overflow-hidden card-record"
                                v-for="(item,index) in itemStream.result"
                                :key="index"
                            >
                                <b-row no-gutters>
                                    <b-col cols="4" sm="4">
                                        <div v-if="!item.stream.coverImage" class="no-image">
                                            <img alt src="../../static/media/logo-small-2.png" />
                                        </div>
                                        <b-card-img
                                            v-else
                                            :src="item.stream.coverImage"
                                            alt="Image"
                                            class="rounded-0 card-record__image"
                                        ></b-card-img>
                                    </b-col>
                                    <b-col cols="8" sm="8">
                                        <b-card-body class="card-record__body">
                                            <div
                                                class="card-record__body--content"
                                                id="list-record-scroller"
                                                ref="listRecordContent"
                                            >
                                                <div
                                                    class="card-record__body--title"
                                                >{{item.stream.title}}</div>
                                                <div class="card-record__body--footer">
                                                    <div
                                                        class="card-record__body--time"
                                                    >{{formatUTCZulu(item.stream.beginStream,"DD MMMM YYYY H:mm")}}</div>
                                                    <button
                                                        @click="watchStream(item.stream.slug)"
                                                        class="btn btn-custom btn-orange"
                                                    >Watch</button>
                                                </div>
                                            </div>
                                        </b-card-body>
                                    </b-col>
                                </b-row>
                            </b-card>
                            <b-row class="list-record__content__see-more">
                                <b-col cols="12">
                                    <b-overlay
                                        :show="loadingRecord"
                                        rounded="pill"
                                        opacity="0.3"
                                        spinner-small
                                        class="d-inline-block"
                                    >
                                        <b-button
                                            :disabled="loadingRecord"
                                            size="small"
                                            class="btn-orange btn-see-more"
                                            pill
                                            @click="onShowMoreRecord()"
                                        >See more</b-button>
                                    </b-overlay>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <watch-stream v-else></watch-stream>
    </div>
</template>

<script>
import Home from "../assets/js/pages/home"
export default Home
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/home";
</style>
