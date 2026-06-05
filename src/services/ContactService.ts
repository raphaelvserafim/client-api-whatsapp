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

  async block(number: string, action: 'block' | 'unblock'): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}`,
      method: HttpMethod.PATCH,
      params: { action },
    });
  }
}
