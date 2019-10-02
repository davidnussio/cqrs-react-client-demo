import app from "../../client";

function fetchNews() {
  return app.service("news-list").find({
    query: {
      $limit: 20,
      $sort: {
        createdAt: -1
      }
    }
  });
}

const Api = { fetchNews };

export default Api;
