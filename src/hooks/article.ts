import { useCallback, useEffect } from "react";

import { useInfiniteQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getArticles, getTopArticles } from "./../api/article";
import { ArticleSortOptions } from "../constants/article";
import {
  addArticles,
  loading,
  predicate,
  resetPage,
  selectArticle,
  selectedArticle,
  selectedArticles,
  setLoading,
  setPredicate,
} from "./../stores/article";

export const useArticles = () => {
  const articles = useSelector(selectedArticles);
  const listPredicate = useSelector(predicate);
  const isArticleLoading = useSelector(loading);
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["articles", listPredicate],
      async ({ pageParam = 1 }) =>
        listPredicate.search
          ? await getArticles(
              pageParam,
              undefined,
              listPredicate.search,
              listPredicate.sortBy
            )
          : await getTopArticles(pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.totalResults - pages.flatMap((c) => c.articles).length
            ? pages.length + 1
            : undefined;
        },
      }
    );

  const fetchNext = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const setSort = useCallback(
    (value: ArticleSortOptions) => {
      dispatch(setPredicate({ sortBy: value }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(
      setPredicate({
        search: undefined,
        sortBy: ArticleSortOptions.PUBLISHEDAT,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(addArticles(data.pages.flatMap((c) => c.articles)));
    }

    return () => {
      dispatch(resetPage());
    };
  }, [data, dispatch]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setLoading(false));
      return;
    }

    if (isArticleLoading) {
      return;
    }

    dispatch(setLoading(true));
  }, [dispatch, isArticleLoading, isFetching, isLoading]);

  return {
    data: Array.from(articles.values()),
    isLoading: isArticleLoading,
    fetchNext,
    hasNextPage,
    setSort,
    predicate: listPredicate,
  };
};

export const useArticle = () => {
  const { id } = useParams();
  const article = useSelector(selectedArticle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectArticle(id));

    return () => {
      dispatch(selectArticle());
    };
  }, [article, dispatch, id]);

  return { data: article };
};
