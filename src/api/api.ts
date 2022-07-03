import axios from "axios";

import { API_KEY, API_URL } from "../constants/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "X-Api-Key": API_KEY,
  },
});

export default apiClient;
