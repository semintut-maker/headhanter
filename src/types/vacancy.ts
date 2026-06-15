/** @format */

export interface Vacancy {
  id: number;
  company_name: string; // Внимание: поле называется company_name, а не просто company
  name: string; // Название вакансии
  city: string;
  salary: string; // Приходит как строка, даже если это число
  short_description: string; // В макете это поле "Требуемый опыт"
  space: "remote" | "office" | "hybrid"; // Тип занятости: 'remote', 'office' или 'hybrid'
  skills: string; // Навыки одной строкой, например "React, Next, JS"
  experience: string; // Требуемый опыт, например "3-5 лет"
  published_at: string; // Дата публикации
}

// Тип для ответа от API
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
