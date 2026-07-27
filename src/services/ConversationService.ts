import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, ConversationComponentsData } from '../types';

/**
 * Conversational components (official only — Cloud API).
 * Maps to the `/conversation` endpoints.
 */
export class ConversationService {
  constructor(private readonly http: IHttpClient) {}

  /** Get conversational components. */
  async getComponents(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CONVERSATION,
      method: HttpMethod.GET,
    });
  }

  /** Update conversational components. */
  async updateComponents(data: ConversationComponentsData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CONVERSATION,
      method: HttpMethod.POST,
      body: data,
    });
  }
}
