import { IHttpClient } from '../client/IHttpClient';
import {
  Routes, HttpMethod, ApiResponse, Provider,
  ListChatsResponse, ChatMessagesResponse,
} from '../types';

export class ChatService {
  constructor(
    private readonly http: IHttpClient,
    private readonly defaultProvider?: Provider,
  ) {}

  /**
   * List the chats (individual and group) of **one** channel, newest first.
   *
   * Each entry carries the last message timestamp, the stored message count,
   * the `channel` it belongs to and the `contact` behind it
   * (`{ phone, name }` — `name` is empty when the contact is not in the
   * address book).
   *
   * WhatsApp, Instagram and Messenger conversations share the same storage, so
   * without a channel they would come back mixed: an Instagram IGSID and a
   * Messenger PSID look just like phone numbers in `chatId`. `provider` picks
   * the channel — per-call value wins, then the client-level default passed to
   * `new Wame({ provider })`, then the API default `whatsapp`.
   *
   * Asking for a channel the instance does not have connected fails with 422
   * (`WhatsAppError`), as does an unknown provider value.
   *
   * @param provider Channel to list: `whatsapp` (default), `instagram` or `messenger`.
   *
   * @example
   * const { chats } = await wa.chat.list('instagram');
   * for (const chat of chats) {
   *   if (typeof chat === 'string') continue; // MongoDB fallback: ids only
   *   console.log(chat.chatId, chat.contact.name, chat.messageCount);
   * }
   */
  async list(provider?: Provider): Promise<ListChatsResponse> {
    const channel = provider ?? this.defaultProvider;
    return this.http.request<ListChatsResponse>({
      route: Routes.CHAT,
      method: HttpMethod.GET,
      params: channel ? { provider: channel } : undefined,
    });
  }

  async modify(id: string, action: 'markRead' | 'pin', value: boolean): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CHAT,
      method: HttpMethod.PATCH,
      params: { id, action, value },
    });
  }

  async delete(chatId: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CHAT,
      method: HttpMethod.DELETE,
      params: { chatId },
    });
  }

  /**
   * Paginated messages of a chat. `limit` is clamped server-side to 1..100
   * (default 50) and `page` starts at 1.
   *
   * This endpoint takes no `provider` — pass the `chatId` exactly as
   * {@link list} returned it and the channel is resolved from it.
   */
  async messages(chatId: string, page?: number, limit?: number): Promise<ChatMessagesResponse> {
    const params: Record<string, string | number> = { chatId };
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    return this.http.request<ChatMessagesResponse>({
      route: `${Routes.CHAT}/messages`,
      method: HttpMethod.GET,
      params,
    });
  }

  async presenceSubscribe(jid: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/presence/subscribe`,
      method: HttpMethod.POST,
      body: { jid },
    });
  }

  async disappearing(jid: string, expiration: number): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/disappearing`,
      method: HttpMethod.POST,
      body: { jid, expiration },
    });
  }

  async privacy(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CHAT}/privacy`,
      method: HttpMethod.GET,
    });
  }
}
