export interface RequestOptions {
  route: string;
  method: string;
  body?: object;
  params?: Record<string, string | number | boolean>;
}

export interface IHttpClient {
  request<T>(options: RequestOptions): Promise<T>;
}
