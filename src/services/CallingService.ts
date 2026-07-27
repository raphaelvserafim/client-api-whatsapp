import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, CallControlData } from '../types';

/**
 * Calling settings and call control (official only — Cloud API).
 * Maps to the `/calling` endpoints.
 */
export class CallingService {
  constructor(private readonly http: IHttpClient) {}

  /** Get calling settings. */
  async getSettings(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CALLING}/settings`,
      method: HttpMethod.GET,
    });
  }

  /** Update calling settings. */
  async updateSettings(calling: object): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CALLING}/settings`,
      method: HttpMethod.POST,
      body: { calling },
    });
  }

  /** Control a call: connect/pre_accept/accept/reject/terminate. */
  async controlCall(data: CallControlData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CALLING}/call`,
      method: HttpMethod.POST,
      body: data,
    });
  }
}
