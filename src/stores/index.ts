import { configureStore } from "@reduxjs/toolkit";

import article from "./article";

const store = configureStore({
  reducer: {
    articles: article,
  },
});

export default store;
