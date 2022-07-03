import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ArticleDetail from "./ArticleDetail";
import store from "../../stores";
import { addArticles, selectArticle } from "../../stores/article";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

describe("Article Details Page", () => {
  it("Should Not Render Empty Page", async () => {
    store.dispatch(
      addArticles([
        {
          source: {
            id: "test",
            name: "test",
          },
          title: "test",
          slug: "test",
          publishedAt: "test",
          url: "test",
        },
      ])
    );

    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ArticleDetail />
        </Provider>
      </BrowserRouter>
    );

    await act(() => {
      store.dispatch(selectArticle("test"));
    });

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("articleDetailsContainer")).toBeTruthy();
  });
});
