const withTranspileModules = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [withTranspileModules(["@cloudscape-design/components"])],
  {
    env: {
      ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    },
  }
);
