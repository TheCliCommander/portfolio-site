const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  parallel: true, // Enable parallel processing
  configureWebpack: {
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    },
    optimization: {
      splitChunks: false
    },
    performance: {
      hints: false
    }
  },
  devServer: {
    hot: true,
    liveReload: true,
    client: {
      overlay: false
    }
  }
});