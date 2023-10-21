export interface RequestGetQuery {
  search: string;
}

export interface RequestParams {
  id: string;
}

export interface RequestBody {
  title?: string;
  description?: string;
  updatedAt?: string;
  completedAt?: string;
  createdAt?: string;
}
