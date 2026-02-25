import type { MovieSummary } from "./movie";

export interface PaginatedResults {
  results: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}
