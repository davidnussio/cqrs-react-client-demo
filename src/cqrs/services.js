import app from "../client";

function commandDispatcher(command) {
  return app.service("command-handler").create(command);
}

const Api = { commandDispatcher };

export default Api;
