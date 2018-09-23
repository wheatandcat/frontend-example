module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: false,
          generateStatsFile: true
        })
      );
    }

    return config;
  }
};
