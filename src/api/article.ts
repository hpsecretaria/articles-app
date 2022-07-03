import apiClient from "./api";
import { IArticle } from "../models/article";
import { IPaginatedResponse } from "../models/common";
import { slugify } from "../utils/slugify";

export const getTopArticles = async (
  page: number | undefined = 1,
  pageSize: number | undefined = 20
): Promise<IPaginatedResponse & { articles: IArticle[] }> => {
  const params = {
    country: "us",
    page,
    pageSize,
  };

  const url = `/top-headlines`;

  const response = await apiClient.get<
    IPaginatedResponse & { articles: IArticle[] }
  >(url, { params });

  await new Promise((r) => setTimeout(r, 2000));

  const data = response.data;
  data.articles = data.articles.map((c) => ({ ...c, slug: slugify(c.title) }));
  return data;
};

export const getArticles = async (
  page: number | undefined = 1,
  pageSize: number | undefined = 20,
  search?: string,
  sortBy?: "relevancy" | "popularity" | "publishedAt"
): Promise<IPaginatedResponse & { articles: IArticle[] }> => {
  const params = {
    q: search,
    sortBy,
    page,
    pageSize,
  };

  const url = `/everything`;

  const response = await apiClient.get<
    IPaginatedResponse & { articles: IArticle[] }
  >(url, { params });

  await new Promise((r) => setTimeout(r, 2000));

  const data = response.data;
  data.articles = data.articles.map((c) => ({ ...c, slug: slugify(c.title) }));
  return data;
};
