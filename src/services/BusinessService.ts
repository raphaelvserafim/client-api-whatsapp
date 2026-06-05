import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, Product, CatalogResponse } from '../types';

export class BusinessService {
  constructor(private readonly http: IHttpClient) {}

  async getCatalog(limit?: number, cursor?: string): Promise<CatalogResponse> {
    const params: Record<string, string | number> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;
    return this.http.request<CatalogResponse>({
      route: `${Routes.BUSINESS}/catalog`,
      method: HttpMethod.GET,
      params,
    });
  }

  async createProduct(product: Product): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/catalog/product`,
      method: HttpMethod.POST,
      body: product,
    });
  }

  async updateProduct(productId: string, product: Product): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/catalog/product/${productId}`,
      method: HttpMethod.PUT,
      body: product,
    });
  }

  async deleteProduct(productId: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/catalog/product/${productId}`,
      method: HttpMethod.DELETE,
    });
  }
}
