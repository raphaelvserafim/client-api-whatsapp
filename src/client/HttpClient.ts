import axios, { AxiosError } from 'axios';
import { WhatsAppError } from '../errors';
import { IHttpClient, RequestOptions } from './IHttpClient';

export class HttpClient implements IHttpClient {
  constructor(
    private readonly baseUrl: string,
  ) {}

  async request<T>(options: RequestOptions): Promise<T> {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${options.route}`,
        method: options.method,
        headers: { 'Content-Type': 'application/json' },
        data: options.body,
        params: options.params,
      });
      return response.data as T;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new WhatsAppError(
        axiosError.message,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  }
}
