import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, CallResponse } from '../types';

export class CallService {
  constructor(private readonly http: IHttpClient) {}

  async call(to: string, isVideo: boolean = false): Promise<CallResponse> {
    return this.http.request<CallResponse>({
      route: Routes.CALL,
      method: HttpMethod.POST,
      body: { to, isVideo },
    });
  }

  async reject(id: string, from: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CALL}/${id}/${from}`,
      method: HttpMethod.DELETE,
    });
  }
}
