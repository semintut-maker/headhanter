/** @format */

import axios from "axios";
import type { ApiResponse, Vacancy } from "../types/vacancy";

const API_BASE = "https://kata-jobs.onrender.com/api/jobs";

export interface FetchJobsParams {
  search?: string;
  city?: string;
  skills?: string[];
  page?: number;
  limit?: number;
}

export interface FetchJobsResponse {
  items: Vacancy[];
  total: number;
  totalPages: number; // добавляем это поле
}

export async function fetchJobs({
  search = "",
  city = "",
  skills = [],
  page = 1,
  limit = 10,
}: FetchJobsParams): Promise<FetchJobsResponse> {
  const params: Record<string, string | number> = {
    page: page,
    limit: limit,
  };

  if (search) params.search = search;
  if (city) params.city = city;
  if (skills.length > 0) params.skills = skills.join(",");

  const response = await axios.get<ApiResponse>(API_BASE, { params });
  const { jobs, pagination } = response.data;

  return {
    items: jobs,
    total: pagination.totalItems,
    totalPages: pagination.totalPages, // используем поле из ответа
  };
}
