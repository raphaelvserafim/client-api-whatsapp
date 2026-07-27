import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, AnalyticsQuery } from '../types';

/**
 * Messaging analytics (official only — Cloud API).
 * Maps to the `/analytics` endpoints.
 */
export class AnalyticsService {
  constructor(private readonly http: IHttpClient) {}

  private toParams(query?: AnalyticsQuery): Record<string, string> {
    const params: Record<string, string> = {};
    if (query?.start !== undefined) params.start = query.start;
    if (query?.end !== undefined) params.end = query.end;
    if (query?.granularity !== undefined) params.granularity = query.granularity;
    return params;
  }

  /** Usage vs messaging limit. */
  async usage(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ANALYTICS}/usage`,
      method: HttpMethod.GET,
    });
  }

  /** Conversation analytics. */
  async conversations(query?: AnalyticsQuery): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ANALYTICS}/conversations`,
      method: HttpMethod.GET,
      params: this.toParams(query),
    });
  }

  /** Messaging analytics. */
  async messages(query?: AnalyticsQuery): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ANALYTICS}/messages`,
      method: HttpMethod.GET,
      params: this.toParams(query),
    });
  }

  /** Template analytics. */
  async templates(query?: AnalyticsQuery): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ANALYTICS}/templates`,
      method: HttpMethod.GET,
      params: this.toParams(query),
    });
  }

  /** Pricing analytics. */
  async pricing(query?: AnalyticsQuery): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.ANALYTICS}/pricing`,
      method: HttpMethod.GET,
      params: this.toParams(query),
    });
  }
}
