<template>
    <div class="list-stream-products-wrapper">
        <div class="list-stream-products" v-bind:style="{ width: videoWidthDimension }">
            <div class="list-stream-products__header">
                Products ({{ streamProducts.length }})
                <span
                        class="list-stream-products__close"
                        @click="closeListStreamProduct"
                >x</span>
            </div>
            <div class="list-stream-products__body">
                <div
                        class="stream-product-item"
                        v-for="(streamProduct, indexProduct) in streamProducts"
                        v-bind:key="indexProduct"
                >
                    <div
                            class="stream-product-item__thumbnail"
                            :class="!indexProduct ? 'border-hot-item' : ''"
                    >
                        <b-img
                                rounded
                                class="thumbnail-product"
                                :alt="streamProduct.name"
                                :src="streamProduct.imageUrl"
                        ></b-img>
                        <b-img
                                class="hot-sale-icon"
                                alt="hot"
                                src="../../static/media/icons/hot.png"
                                v-if="!indexProduct"
                        ></b-img>
                        <label class="label-product">{{ streamProduct.label }}</label>
                    </div>
                    <div class="stream-product-item__info">
                        <div class="stream-product-item__info__wrapper">
                            <div
                                    class="stream-product-item__info__wrapper__name"
                            >{{ streamProduct.name }}</div>
                            <div class="stream-product-item__info__wrapper__price">
                                <div v-if="streamProduct.promotionPrice">
                                <span
                                        class="stream-product-item__info__wrapper__price__sale"
                                >{{currencySymbol}}{{ formatCurrency(streamProduct.promotionPrice) }}</span>
                                    <span
                                            class="stream-product-item__info__wrapper__price__original"
                                    >{{currencySymbol}}{{ formatCurrency(streamProduct.price) }}</span>
                                </div>
                                <div v-else>
                                <span
                                        class="stream-product-item__info__wrapper__price__sale"
                                >{{currencySymbol}}{{ formatCurrency(streamProduct.price) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="stream-product-item__actions">
                        <a
                                :href="handleGoToProductUrl(streamProduct.url)"
                                target="_blank"
                                class="link-to-product"
                                v-if="!parseInt(streamProduct.state)"
                        >
                            <b-button class="buy-now-btn center-wrapper">BUY NOW</b-button>
                        </a>

                        <div class="out-of-stock center-wrapper" v-else>Out Of Stock</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ListStreamProducts from "../assets/js/components/list-stream-products"

export default ListStreamProducts
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/list-stream-products";
</style>
