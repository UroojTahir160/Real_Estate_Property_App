const path = require("path");

module.exports = function override(config, env) {
  // Add your path aliases here
  config.resolve.alias = {
    "@components": path.resolve(__dirname, "src/components/index.ts"),
    "@types": path.resolve(__dirname, "src/types/index.ts"),
    "@pages": path.resolve(__dirname, "src/pages/index.ts"),
    "@layout": path.resolve(__dirname, "src/layout/index.ts"),
    "@assets": path.resolve(__dirname, "src/assets/index.ts"),
    "@api": path.resolve(__dirname, "src/api/index.ts"),
  };

  return config;
};
