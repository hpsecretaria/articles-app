import { cleanup } from "@testing-library/react";

import store from "./index";
import { addArticles } from "./article";

afterEach(cleanup);

describe("Article list state tests", () => {
  it("Should initially set articles to an empty list", () => {
    const state = store.getState().articles;
    expect(state.list.length).toEqual(0);
  });

  it("Should add articles to list", () => {
    store.dispatch(addArticles([{
          source: {
              id: 'test',
              name: 'test',
          },
          title: 'test',
          slug: 'test',
          publishedAt: 'test',
          url: 'test',
      }]));

    const state = store.getState().articles;
    expect(state.list.length).toBeGreaterThan(0);
  });
});
