import { IHttpClient } from '../client/IHttpClient';
import { WhatsAppError } from '../errors';
import {
  Routes, HttpMethod, TypeMessage, StatusPresence, Contact, Section,
  Location, Buttons, Items, HeaderMedia, SendMessageRoot, ApiResponse,
  EventData, ListMessagesResponse, LiveLocationData, SendContactsData,
  ProductMessageData, GroupInviteMessageData,
} from '../types';

export class MessageService {
  constructor(private readonly http: IHttpClient) {}

  async list(phoneNumber: string, page?: number, limit?: number): Promise<ListMessagesResponse> {
    const params: Record<string, string | number> = { phoneNumber };
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    return this.http.request<ListMessagesResponse>({
      route: Routes.MESSAGES,
      method: HttpMethod.GET,
      params,
    });
  }

  async send(
    data: {
      type: TypeMessage;
      body: {
        to: string;
        msgId?: string;
        header?: HeaderMedia;
        status?: StatusPresence;
        text?: string;
        url?: string;
        caption?: string;
        mimetype?: string;
        fileName?: string;
        contact?: Contact;
        location?: Location;
        name?: string;
        options?: string[];
        sections?: Section[];
        buttons?: Buttons[];
        footer?: string;
        description?: string;
        title?: string;
        buttonText?: string;
        thumbnailUrl?: string;
        sourceUrl?: string;
        referenceId?: string;
        code?: string;
        key?: string;
        merchantName?: string;
        keyType?: "CNPJ" | "CPF" | "EMAIL" | "PHONE";
        subtotal?: string;
        totalAmount?: string;
        items?: Items[];
      };
    },
    reply: boolean = false,
  ): Promise<SendMessageRoot> {
    if (data.type === TypeMessage.BUTTON_PIX) {
      const { key, keyType, merchantName, subtotal, totalAmount, items } = data.body;
      if (!key || !keyType || !merchantName || !subtotal || !totalAmount || !items || items.length === 0) {
        throw new WhatsAppError("Campos obrigatorios para pagamento via PIX estao ausentes.");
      }
    }

    const route = reply
      ? `${Routes.MESSAGES}/${data.body.msgId}/${data.type}`
      : `${Routes.MESSAGES}/${data.type}`;

    return this.http.request<SendMessageRoot>({ route, method: HttpMethod.POST, body: data.body });
  }

  async forward(to: string, msgId: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/${msgId}/forwarding`,
      method: HttpMethod.POST,
      body: { to },
    });
  }

  async sendSticker(to: string, url: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/sticker`,
      method: HttpMethod.POST,
      body: { to, url },
    });
  }

  async sendVideoNote(to: string, url: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/video-note`,
      method: HttpMethod.POST,
      body: { to, url },
    });
  }

  async sendPoll(to: string, name: string, values: Array<string | number | boolean>, selectableCount?: number): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/poll`,
      method: HttpMethod.POST,
      body: { to, name, values, selectableCount },
    });
  }

  async sendEvent(data: EventData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/event`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async pin(id: string, duration?: number): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/pin`,
      method: HttpMethod.POST,
      body: { id, duration },
    });
  }

  async sendCallLink(to: string, type: string, caption?: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/call-link`,
      method: HttpMethod.POST,
      body: { to, type, caption },
    });
  }

  async sendImageBase64(to: string, base64: string, caption?: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/base64/image`,
      method: HttpMethod.POST,
      body: { to, base64, caption },
    });
  }

  async sendAudioBase64(to: string, base64: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/base64/audio`,
      method: HttpMethod.POST,
      body: { to, base64 },
    });
  }

  async sendDocumentBase64(to: string, base64: string, mimetype: string, fileName?: string, caption?: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/base64/document`,
      method: HttpMethod.POST,
      body: { to, base64, mimetype, fileName, caption },
    });
  }

  async sendContacts(data: SendContactsData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/contacts`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async sendLiveLocation(data: LiveLocationData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/live-location`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async unpin(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/unpin`,
      method: HttpMethod.POST,
      body: { id },
    });
  }

  async getDetails(messageId: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${messageId}`,
      method: HttpMethod.GET,
    });
  }

  async getMedia(messageId: string, format?: string): Promise<ApiResponse> {
    const params: Record<string, string> = {};
    if (format) params.format = format;
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${messageId}/media`,
      method: HttpMethod.GET,
      params,
    });
  }

  async sendProduct(data: ProductMessageData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/product`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async sendGroupInvite(data: GroupInviteMessageData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/group-invite`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  async requestPhone(to: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/request-phone`,
      method: HttpMethod.POST,
      body: { to },
    });
  }

  async createCallLink(type: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/create-call-link`,
      method: HttpMethod.POST,
      body: { type },
    });
  }
}
