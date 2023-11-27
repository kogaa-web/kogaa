module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.kogaa.eu",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
