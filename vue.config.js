const webpack = require('webpack')

module.exports = {
    devServer: {
        client: {
            overlay: false // disables the full-screen error overlay
        }
    },
    productionSourceMap: false,

    css: {
        extract: false,
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/scss/style.scss";`
            }
        }
    },

    chainWebpack: (config) => {
        // Replace deprecated `url-loader` with native Webpack 5 asset handling
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp)$/i)
            .type('asset')
            .parser({
                dataUrlCondition: {
                    maxSize: 10 * 1024 // Inline images smaller than 10kb
                }
            })

        // Update SVG rule to use vue-svg-loader
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    },

    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            })
        ]
    }
}
