/** @format */

export interface Vacancy {
  id: number;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  short_description: string;
  space: "remote" | "office" | "hybrid";
  skills: string;
  experience: string;
  published_at: string;
  description?: string;
  about_company?: string;
}

export interface ApiResponse {
  success: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  jobs: Vacancy[];
}

export interface SingleJobResponse {
  success: boolean;
  job: Vacancy;
}
