/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require("next-offline");

module.exports = withOffline({
  trailingSlash: true,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.woff2$/,
        handler: "CacheFirst",
      },
    ],
  },
});
