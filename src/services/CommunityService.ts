import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, ApiResponse, CommunityInfo, InviteCodeResponse,
  CommunityCreate, CommunityUpdate, GroupParticipant, GroupParticipantsAction,
  CommunityGroupCreate,
} from '../types';

export class CommunityService {
  constructor(private readonly http: IHttpClient) {}

  async list(): Promise<{ status: number; data: CommunityInfo[] }> {
    return this.http.request<{ status: number; data: CommunityInfo[] }>({
      route: Routes.COMMUNITY,
      method: HttpMethod.GET,
    });
  }

  async create(data: CommunityCreate): Promise<{ status: number; data: CommunityInfo }> {
    return this.http.request<{ status: number; data: CommunityInfo }>({
      route: Routes.COMMUNITY,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async info(id: string): Promise<{ status: number; data: CommunityInfo }> {
    return this.http.request<{ status: number; data: CommunityInfo }>({
      route: `${Routes.COMMUNITY}/${id}`,
      method: HttpMethod.GET,
    });
  }

  async update(id: string, data: CommunityUpdate): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}`,
      method: HttpMethod.PUT,
      body: data,
    });
  }

  async leave(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

  async updatePicture(id: string, url: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/picture`,
      method: HttpMethod.PUT,
      body: { url },
    });
  }

  async getInviteCode(id: string): Promise<InviteCodeResponse> {
    return this.http.request<InviteCodeResponse>({
      route: `${Routes.COMMUNITY}/${id}/invite`,
      method: HttpMethod.POST,
    });
  }

  async removeParticipants(id: string, participants: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/participants`,
      method: HttpMethod.DELETE,
      body: { participants },
    });
  }

  async getRequestParticipants(id: string): Promise<{ status: number; data: GroupParticipant[] }> {
    return this.http.request<{ status: number; data: GroupParticipant[] }>({
      route: `${Routes.COMMUNITY}/${id}/request_participants_list`,
      method: HttpMethod.GET,
    });
  }

  async updateRequestParticipants(id: string, data: GroupParticipantsAction): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/request_participants_list`,
      method: HttpMethod.PUT,
      body: data,
    });
  }

  async acceptInvite(code: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/invite/accept`,
      method: HttpMethod.POST,
      body: { code },
    });
  }

  async getInviteInfo(code: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/invite/info`,
      method: HttpMethod.GET,
      params: { code },
    });
  }

  async createGroup(id: string, data: CommunityGroupCreate): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/group`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async ephemeral(id: string, expiration: number): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/ephemeral`,
      method: HttpMethod.POST,
      body: { expiration },
    });
  }

  async updateSettings(id: string, setting: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/settings`,
      method: HttpMethod.PATCH,
      body: { setting },
    });
  }

  async memberAddMode(id: string, mode: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/member-add-mode`,
      method: HttpMethod.PATCH,
      body: { mode },
    });
  }

  async joinApproval(id: string, mode: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.COMMUNITY}/${id}/join-approval`,
      method: HttpMethod.PATCH,
      body: { mode },
    });
  }
}
