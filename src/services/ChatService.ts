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

  async messages(chatId: string): Promise<{ status: number; data: MessageData[] }> {
    return this.http.request<{ status: number; data: MessageData[] }>({
      route: `${Routes.CHAT}/messages`,
      method: HttpMethod.GET,
      params: { chatId },
    });
  }
}
