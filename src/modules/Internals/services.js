import app from "../../client";

function fetchNews() {
  return app.service("news-list").find({});
}

const Api = { fetchNews };

export default Api;
