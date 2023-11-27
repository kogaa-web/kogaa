module.exports = {
  images: {
    domains: ["admin.kogaa.eu"],
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
