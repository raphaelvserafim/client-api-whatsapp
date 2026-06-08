import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, LabelInfo, ChatInfo } from '../types';

export class LabelService {
  constructor(private readonly http: IHttpClient) {}

  async list(): Promise<{ status: number; data: LabelInfo[] }> {
    return this.http.request<{ status: number; data: LabelInfo[] }>({
      route: Routes.LABELS,
      method: HttpMethod.GET,
    });
  }

  async create(name: string, labelId?: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.LABELS,
      method: HttpMethod.POST,
      body: { name, labelId },
    });
  }

  async getChats(labelId: string): Promise<{ status: number; data: ChatInfo[] }> {
    return this.http.request<{ status: number; data: ChatInfo[] }>({
      route: `${Routes.LABELS}/${labelId}`,
      method: HttpMethod.GET,
    });
  }

  async addToChat(labelId: string, to: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.LABELS}/${labelId}`,
      method: HttpMethod.POST,
      body: { to },
    });
  }

  async delete(labelId: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.LABELS}/${labelId}`,
      method: HttpMethod.DELETE,
    });
  }

  async removeFromChat(labelId: string, to: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.LABELS}/${labelId}/chat/${to}`,
      method: HttpMethod.DELETE,
    });
  }
}
