const webpack = require("webpack");
module.exports = {
   productionSourceMap: false,
   chainWebpack: (config) => {
      config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader');
          // .tap(options => Object.assign(options, { limit: 10240 }))

      const svgRule = config.module.rule('svg');
      svgRule.uses.clear();
      svgRule
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
   },
   configureWebpack: {
      plugins: [
         new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
         })
      ],
   },
   css: {
      extract: false,
   },
};