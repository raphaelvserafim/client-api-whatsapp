import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, ApiResponse, RegisteredResponse,
  DownloadableMessage, DownloadMediaResponse,
} from '../types';

export class ActionService {
  constructor(private readonly http: IHttpClient) {}

  async checkRegistered(number: string): Promise<RegisteredResponse> {
    return this.http.request<RegisteredResponse>({
      route: `${Routes.ACTIONS}/registered`,
      method: HttpMethod.GET,
      params: { number },
    });
  }

  async downloadMedia(type: 'image' | 'video' | 'sticker' | 'audio' | 'document', message: DownloadableMessage): Promise<DownloadMediaResponse> {
    return this.http.request<DownloadMediaResponse>({
      route: `${Routes.ACTIONS}/download/media`,
      method: HttpMethod.POST,
      body: message,
      params: { type },
    });
  }

  async deleteStorage(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ACTIONS}/storage`,
      method: HttpMethod.DELETE,
    });
  }
}
