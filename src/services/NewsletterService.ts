import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, NewsletterInfo } from '../types';

export class NewsletterService {
  constructor(private readonly http: IHttpClient) {}

  async create(name: string, description?: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.NEWSLETTER,
      method: HttpMethod.POST,
      body: { name, description },
    });
  }

  async getMetadata(type: string, id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/metadata`,
      method: HttpMethod.GET,
      params: { type, id },
    });
  }

  async getSubscribers(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/subscribers`,
      method: HttpMethod.GET,
    });
  }

  async getAdmins(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/admins`,
      method: HttpMethod.GET,
    });
  }

  async follow(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/follow`,
      method: HttpMethod.POST,
    });
  }

  async unfollow(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/unfollow`,
      method: HttpMethod.POST,
    });
  }

  async updateName(id: string, name: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/name`,
      method: HttpMethod.PUT,
      body: { name },
    });
  }

  async updateDescription(id: string, description: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/description`,
      method: HttpMethod.PUT,
      body: { description },
    });
  }

  async updatePicture(id: string, url: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/picture`,
      method: HttpMethod.PUT,
      body: { url },
    });
  }

  async removePicture(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/picture`,
      method: HttpMethod.DELETE,
    });
  }

  async transferOwnership(id: string, newOwnerJid: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/owner`,
      method: HttpMethod.PUT,
      body: { newOwnerJid },
    });
  }

  async demoteAdmin(id: string, userJid: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/demote`,
      method: HttpMethod.PUT,
      body: { userJid },
    });
  }

  async getMessages(id: string, count?: number, since?: number, after?: number): Promise<ApiResponse> {
    const params: Record<string, number> = {};
    if (count !== undefined) params.count = count;
    if (since !== undefined) params.since = since;
    if (after !== undefined) params.after = after;
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/messages`,
      method: HttpMethod.GET,
      params,
    });
  }

  async react(id: string, serverId: string, reaction: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/react`,
      method: HttpMethod.POST,
      body: { serverId, reaction },
    });
  }

  async mute(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/mute`,
      method: HttpMethod.POST,
    });
  }

  async unmute(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}/unmute`,
      method: HttpMethod.POST,
    });
  }

  async delete(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.NEWSLETTER}/${id}`,
      method: HttpMethod.DELETE,
    });
  }
}
