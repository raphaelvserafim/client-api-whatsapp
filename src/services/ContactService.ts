import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, ContactInfo } from '../types';

export class ContactService {
  constructor(private readonly http: IHttpClient) {}

  async list(): Promise<{ status: number; data: ContactInfo[] }> {
    return this.http.request<{ status: number; data: ContactInfo[] }>({
      route: Routes.CONTACTS,
      method: HttpMethod.GET,
    });
  }

  async profile(id: string): Promise<{ status: number; data: ContactInfo }> {
    return this.http.request<{ status: number; data: ContactInfo }>({
      route: `${Routes.CONTACTS}/${id}`,
      method: HttpMethod.GET,
    });
  }

  async add(number: string, name: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CONTACTS,
      method: HttpMethod.POST,
      body: { number, name },
    });
  }

  async remove(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}`,
      method: HttpMethod.DELETE,
    });
  }

  async block(number: string, action: 'block' | 'unblock'): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}`,
      method: HttpMethod.PATCH,
      params: { action },
    });
  }

  async clearSession(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}/session`,
      method: HttpMethod.DELETE,
    });
  }

  async getStatus(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}/status`,
      method: HttpMethod.GET,
    });
  }

  async listBlocked(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/blocked`,
      method: HttpMethod.GET,
    });
  }

  async resolveLids(lids: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/resolve-lids`,
      method: HttpMethod.POST,
      body: { lids },
    });
  }
}
