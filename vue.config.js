const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/portfolio-site/'
    : '/',
  transpileDependencies: true,
  parallel: true,
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
    hot: 'only',
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true
      }
    },
    client: {
      overlay: false,
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
});