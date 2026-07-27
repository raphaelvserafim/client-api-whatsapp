import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, Product, CatalogResponse, CommerceSettings } from '../types';

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

  /** List product collections. */
  async getCollections(limit?: number): Promise<ApiResponse> {
    const params: Record<string, number> = {};
    if (limit !== undefined) params.limit = limit;
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/collections`,
      method: HttpMethod.GET,
      params,
    });
  }

  /** Get order details. */
  async getOrder(orderId: string, token?: string): Promise<ApiResponse> {
    const params: Record<string, string> = {};
    if (token !== undefined) params.token = token;
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/order/${orderId}`,
      method: HttpMethod.GET,
      params,
    });
  }

  /** Get commerce settings (official only). */
  async getCommerceSettings(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/commerce-settings`,
      method: HttpMethod.GET,
    });
  }

  /** Update commerce settings (official only). */
  async updateCommerceSettings(settings: CommerceSettings): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.BUSINESS}/commerce-settings`,
      method: HttpMethod.POST,
      body: settings,
    });
  }
}
