import { FETCH_NEWS, NEWS_FETCH_SUCCEEDED } from "../eventTypes";

export const fetchNews = () => ({ type: FETCH_NEWS });

export const reducer = (draft, { type, payload }) => {
  if (type === NEWS_FETCH_SUCCEEDED) {
    draft.data = payload.data;
  }
};
