import { IHttpClient } from '../client/IHttpClient';
import { Routes, HttpMethod, ApiResponse, ContactInfo, ListContactsResponse, Provider } from '../types';

export class ContactService {
  constructor(private readonly http: IHttpClient) {}

  /**
   * Full address book of the instance, across every connected channel.
   *
   * Each entry carries the `channel` it belongs to — `whatsapp`, `instagram`
   * or `messenger` — because all three share the same storage and their ids
   * live in the same `number` field: phone digits on WhatsApp, an IGSID on
   * Instagram, a PSID on Messenger. Unlike `wa.chat.list()`, this endpoint
   * takes no `provider` filter; use {@link listByChannel} (or filter on
   * `channel` yourself) when you want a single channel.
   *
   * `name` is an empty string when the contact has no known name.
   * `pictureUrl` (signed, expiring Meta URL) and `username` (the Instagram
   * handle) are present only when known.
   *
   * @example
   * const { total, contacts } = await wa.contact.list();
   * const instagram = contacts.filter(c => c.channel === 'instagram');
   */
  async list(): Promise<ListContactsResponse> {
    return this.http.request<ListContactsResponse>({
      route: Routes.CONTACTS,
      method: HttpMethod.GET,
    });
  }

  /**
   * {@link list} narrowed to one channel. Convenience wrapper — the filtering
   * happens client-side, so it still fetches the whole address book.
   */
  async listByChannel(channel: Provider): Promise<ListContactsResponse> {
    const response = await this.list();
    const contacts = (response.contacts ?? []).filter((contact) => contact.channel === channel);
    return { ...response, total: contacts.length, contacts };
  }

  async profile(id: string): Promise<{ status: number; data: ContactInfo }> {
    return this.http.request<{ status: number; data: ContactInfo }>({
      route: `${Routes.CONTACTS}/${id}`,
      method: HttpMethod.GET,
    });
  }

  async add(number: string, name: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: Routes.CONTACTS,
      method: HttpMethod.POST,
      body: { number, name },
    });
  }

  async remove(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}`,
      method: HttpMethod.DELETE,
    });
  }

  async block(number: string, action: 'block' | 'unblock'): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}`,
      method: HttpMethod.PATCH,
      params: { action },
    });
  }

  async clearSession(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}/session`,
      method: HttpMethod.DELETE,
    });
  }

  async getStatus(number: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/${number}/status`,
      method: HttpMethod.GET,
    });
  }

  async listBlocked(): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/blocked`,
      method: HttpMethod.GET,
    });
  }

  async resolveLids(lids: string[]): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.CONTACTS}/resolve-lids`,
      method: HttpMethod.POST,
      body: { lids },
    });
  }
}
