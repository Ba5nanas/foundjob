export interface ApiSuccess<TData> {
  ok: true;
  data: TData;
  requestId?: string;
}

export interface ApiFailure {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
}

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;
