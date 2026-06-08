import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, StatusTextData, StatusMediaData, StatusMentionData } from '../types';

export class StatusService {
  constructor(private readonly http: IHttpClient) {}

  async sendText(data: StatusTextData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.STATUS}/text`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async sendImage(data: StatusMediaData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.STATUS}/image`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async sendVideo(data: StatusMediaData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.STATUS}/video`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async sendAudio(data: { url: string; statusJidList?: string[] }): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.STATUS}/audio`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async mention(data: StatusMentionData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.STATUS}/mention`,
      method: HttpMethod.POST,
      body: data,
    });
  }
}
