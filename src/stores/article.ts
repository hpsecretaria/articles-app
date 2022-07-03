import { createSlice } from "@reduxjs/toolkit";
import { ArticleSortOptions } from "../constants/article";

import { IArticle } from "../models/article";

enum Predicate {
  SEARCH = "search",
  SORTBY = "sortBy",
}

type IPredicate = {
  [Predicate.SEARCH]?: string;
  [Predicate.SORTBY]?: ArticleSortOptions;
};

type IState = {
  list: IArticle[];
  selectedArticle?: IArticle | null ;
  currentPage: number;
  loading: boolean;
  predicate: IPredicate;
};

const usersInitialState: IState = {
  list: [],
  currentPage: 1,
  loading: false,
  predicate: {
    [Predicate.SORTBY]: ArticleSortOptions.PUBLISHEDAT,
  },
};

const articleSlice = createSlice({
  name: "articles",
  initialState: usersInitialState,
  reducers: {
    addArticles: (state, action: { payload: IArticle[] }) => {
      const articles = action.payload;
      state.loading = true;
      state.list = [...articles];
      state.loading = false;
    },
    selectArticle: (state, action: { payload: string | undefined }) => {
      const id = action.payload;
      state.loading = true;
      if (!id) {
        state.selectedArticle = undefined;
        state.loading = false;
        return;
      }
      state.selectedArticle =
        state.list.filter((c) => c.slug === id)[0] || null;
      state.loading = false;
    },
    setPredicate: (state, action: { payload: IPredicate }) => {
      state.list = [];
      for (const [key, value] of Object.entries(action.payload)) {
        switch (key) {
          case Predicate.SEARCH:
            state.predicate.search = value;
            break;

          case Predicate.SORTBY:
            state.predicate.sortBy = value as ArticleSortOptions;
            break;
          default:
            break;
        }
      }
    },
    setLoading: (state, action: { payload: boolean | undefined }) => {
      state.loading = !!action.payload;
    },
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
});

export default articleSlice.reducer;
export const {
  addArticles,
  selectArticle,
  nextPage,
  resetPage,
  setLoading,
  setPredicate,
} = articleSlice.actions;
export const selectedArticles = (state: { articles: IState }) => {
  return state.articles.list;
};
export const selectedArticle = (state: { articles: IState }) => {
  return state.articles.selectedArticle;
};

export const selectedPage = (state: { articles: IState }) => {
  return state.articles.currentPage;
};

export const loading = (state: { articles: IState }) => {
  return state.articles.loading;
};

export const predicate = (state: { articles: IState }) => {
  return state.articles.predicate;
};
