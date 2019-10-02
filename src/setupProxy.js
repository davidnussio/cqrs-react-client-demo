const proxy = require("http-proxy-middleware");

module.exports = function configureProxy(app) {
  app.use(
    proxy("/api", {
      target: process.env.PROXY_SERVER || "http://localhost:3030",
      ws: true
    })
  );
};
