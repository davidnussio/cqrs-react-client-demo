/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const rewireAliases = require("react-app-rewire-aliases");
const { useBabelRc, override } = require("customize-cra");

/* config-overrides.js */
module.exports = (config, env) => {
  config = rewireReactHotLoader(config, env);

  config = rewireAliases.aliasesOptions({
    "react-dom": "@hot-loader/react-dom"
  })(config, env);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  config = override(useBabelRc())(config, env);
  return config;
};
