export type Pagination = {
  current_page?: number;
  last_page?: number;
  total?: number;
  per_page?: number;
  from?: number;
  to?: number;
};

export type ListResponse<T> = {
  data: T[];
  pagination: Pagination;
};

export type ListParams = {
  status?: string;
  sort?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_type?: "DESC" | "ASC";
  get?: "basic" | "detail";
  type?: string | string[];
};

export type Response<T> = {
  data: T;
  message?: string;
  status_code?: number;
  status: string;
};

export type RouteParams = {
  id: string | number;
  slug: string;
};
