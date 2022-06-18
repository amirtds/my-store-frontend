const configs = require("./configs.json");

module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: configs.IMAGE_DOMAINS,
    path: "/_next/image",
    loader: "default",
  },
};
