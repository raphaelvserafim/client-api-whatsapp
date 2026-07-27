import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, ApiResponse, CreateTemplateData, UpdateTemplateData,
} from '../types';

/**
 * Message templates (official only — Cloud API).
 * Maps to the `/templates` endpoints.
 */
export class TemplatesService {
  constructor(private readonly http: IHttpClient) {}

  /** List message templates. */
  async list(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.TEMPLATES,
      method: HttpMethod.GET,
    });
  }

  /** Create a message template. */
  async create(data: CreateTemplateData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.TEMPLATES,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Delete a message template by name. */
  async delete(name: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.TEMPLATES,
      method: HttpMethod.DELETE,
      params: { name },
    });
  }

  /** Upload a header media sample and get its handle. */
  async uploadHeaderMedia(url: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.TEMPLATES}/upload`,
      method: HttpMethod.POST,
      body: { url },
    });
  }

  /** Get a message template by ID. */
  async get(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.TEMPLATES}/${id}`,
      method: HttpMethod.GET,
    });
  }

  /** Edit a message template by ID. */
  async update(id: string, data: UpdateTemplateData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.TEMPLATES}/${id}`,
      method: HttpMethod.PUT,
      body: data,
    });
  }
}
