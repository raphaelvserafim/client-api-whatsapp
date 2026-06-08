import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, ChatInfo, MessageData } from '../types';

export class ChatService {
  constructor(private readonly http: IHttpClient) {}

  async list(): Promise<{ status: number; data: ChatInfo[] }> {
    return this.http.request<{ status: number; data: ChatInfo[] }>({
      route: Routes.CHAT,
      method: HttpMethod.GET,
    });
  }

  async modify(id: string, action: 'markRead' | 'pin', value: boolean): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CHAT,
      method: HttpMethod.PATCH,
      params: { id, action, value },
    });
  }

  async delete(chatId: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CHAT,
      method: HttpMethod.DELETE,
      params: { chatId },
    });
  }

  async messages(chatId: string, page?: number, limit?: number): Promise<{ status: number; data: MessageData[] }> {
    const params: Record<string, string | number> = { chatId };
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    return this.http.request<{ status: number; data: MessageData[] }>({
      route: `${Routes.CHAT}/messages`,
      method: HttpMethod.GET,
      params,
    });
  }

  async presenceSubscribe(jid: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/presence/subscribe`,
      method: HttpMethod.POST,
      body: { jid },
    });
  }

  async disappearing(jid: string, expiration: number): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/disappearing`,
      method: HttpMethod.POST,
      body: { jid, expiration },
    });
  }

  async privacy(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/privacy`,
      method: HttpMethod.GET,
    });
  }
}
