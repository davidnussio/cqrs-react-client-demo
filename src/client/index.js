import io from "socket.io-client";
import feathers from "@feathersjs/client";

// const rest = require("@feathersjs/rest-client");

// const restClient = rest("/api");

// Configure an AJAX library (see below) with that client

// Socket.io is exposed as the `io` global.
// @feathersjs/client is exposed as the `feathers` global.
const app = feathers();

const socket = io({ path: "/api/socket.io" });
app.configure(feathers.socketio(socket));

// app.configure(restClient.fetch(window.fetch));

export default app;
