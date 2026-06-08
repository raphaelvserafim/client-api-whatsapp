import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, ApiResponse, GroupInfo, InviteCodeResponse,
  GroupParticipant, GroupParticipantsAction,
} from '../types';

export class GroupService {
  constructor(private readonly http: IHttpClient) {}

  async list(): Promise<{ status: number; data: GroupInfo[] }> {
    return this.http.request<{ status: number; data: GroupInfo[] }>({
      route: Routes.GROUPS,
      method: HttpMethod.GET,
    });
  }

  async info(id: string): Promise<{ status: number; data: GroupInfo }> {
    return this.http.request<{ status: number; data: GroupInfo }>({
      route: `${Routes.GROUPS}/${id}`,
      method: HttpMethod.GET,
    });
  }

  async create(name: string, participants: string[]): Promise<{ status: number; data: GroupInfo }> {
    return this.http.request<{ status: number; data: GroupInfo }>({
      route: Routes.GROUPS,
      method: HttpMethod.POST,
      body: { name, participants },
    });
  }

  async update(id: string, name: string, description: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}`,
      method: HttpMethod.PUT,
      body: { name, description },
    });
  }

  async changeSettings(id: string, setting: 'announcement' | 'not_announcement' | 'locked' | 'unlocked'): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}`,
      method: HttpMethod.PATCH,
      params: { setting },
    });
  }

  async leave(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

  async getMembers(id: string): Promise<{ status: number; data: GroupParticipant[] }> {
    return this.http.request<{ status: number; data: GroupParticipant[] }>({
      route: `${Routes.GROUPS}/${id}/members`,
      method: HttpMethod.GET,
    });
  }

  async getInviteInfo(code: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/invite/info`,
      method: HttpMethod.GET,
      params: { code },
    });
  }

  async getInviteCode(id: string): Promise<InviteCodeResponse> {
    return this.http.request<InviteCodeResponse>({
      route: `${Routes.GROUPS}/${id}/invite`,
      method: HttpMethod.GET,
    });
  }

  async updatePicture(id: string, url: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/picture`,
      method: HttpMethod.PUT,
      body: { url },
    });
  }

  async removePicture(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/picture`,
      method: HttpMethod.DELETE,
    });
  }

  async addParticipants(id: string, participants: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/participants`,
      method: HttpMethod.POST,
      body: { participants },
    });
  }

  async removeParticipants(id: string, participants: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/participants`,
      method: HttpMethod.DELETE,
      body: { participants },
    });
  }

  async updateParticipantRole(id: string, action: 'promote' | 'demote', participants: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/role`,
      method: HttpMethod.PATCH,
      body: { participants },
      params: { action },
    });
  }

  async getRequestParticipants(id: string): Promise<{ status: number; data: GroupParticipant[] }> {
    return this.http.request<{ status: number; data: GroupParticipant[] }>({
      route: `${Routes.GROUPS}/${id}/request_participants_list`,
      method: HttpMethod.GET,
    });
  }

  async updateRequestParticipants(id: string, data: GroupParticipantsAction): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.GROUPS}/${id}/request_participants_list`,
      method: HttpMethod.PUT,
      body: data,
    });
  }
}
