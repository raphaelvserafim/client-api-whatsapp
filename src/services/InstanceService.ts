import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, WebhookBody, InfoInstance, Connect,
  ApiResponse, PairingCodeResponse, MobileRegisterData, WebhookStatistics,
} from '../types';

export class InstanceService {
  constructor(private readonly http: IHttpClient) {}

  async connect(): Promise<Connect> {
    return this.http.request<Connect>({
      route: Routes.INSTANCES,
      method: HttpMethod.POST,
    });
  }

  async info(): Promise<InfoInstance> {
    return this.http.request<InfoInstance>({
      route: Routes.INSTANCES,
      method: HttpMethod.GET,
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.INSTANCES,
      method: HttpMethod.DELETE,
    });
  }

  async setting(data: { markMessageRead: boolean; saveMedia: boolean; receiveStatusMessage: boolean; receivePresence: boolean }): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.INSTANCES,
      method: HttpMethod.PATCH,
      params: data,
    });
  }

  async updateWebhook(body: WebhookBody): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.INSTANCES,
      method: HttpMethod.PUT,
      body,
    });
  }

  async pairingCode(phoneNumber: string): Promise<PairingCodeResponse> {
    return this.http.request<PairingCodeResponse>({
      route: `${Routes.INSTANCES}/pairing-code`,
      method: HttpMethod.POST,
      body: { phoneNumber },
    });
  }

  async addMongoDb(uri: string, dbName: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/mongodb`,
      method: HttpMethod.POST,
      body: { uri, dbName },
    });
  }

  async setProxy(proxy: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/proxy`,
      method: HttpMethod.POST,
      body: { proxy },
    });
  }

  async resync(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/resync`,
      method: HttpMethod.POST,
    });
  }

  async restart(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/restart`,
      method: HttpMethod.POST,
    });
  }

  async updateProfileStatus(text: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/status`,
      method: HttpMethod.PUT,
      body: { text },
    });
  }

  async updateProfilePicture(url: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/profile/picture`,
      method: HttpMethod.PUT,
      body: { url },
    });
  }

  async removeProfilePicture(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/profile/picture`,
      method: HttpMethod.DELETE,
    });
  }

  async updateProfileName(name: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/profile/name`,
      method: HttpMethod.PUT,
      body: { name },
    });
  }

  async mobileRegisterPrepare(data: MobileRegisterData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/mobile/prepare`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async mobileRequestCode(method: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/mobile/request-code`,
      method: HttpMethod.POST,
      body: { method },
    });
  }

  async mobileVerifyCode(code: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.INSTANCES}/mobile/verify`,
      method: HttpMethod.POST,
      body: { code },
    });
  }

  async webhookStatistics(): Promise<WebhookStatistics> {
    return this.http.request<WebhookStatistics>({
      route: `${Routes.INSTANCES}/webhook/statistics`,
      method: HttpMethod.GET,
    });
  }
}
