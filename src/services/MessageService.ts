import { IHttpClient } from '../client/IHttpClient';
import { WhatsAppError } from '../errors';
import {
  Routes, HttpMethod, TypeMessage, StatusPresence, Contact, Section,
  Location, Buttons, Items, HeaderMedia, SendMessageRoot, ApiResponse,
  EventData, ListMessagesResponse, LiveLocationData, SendContactsData,
  ProductMessageData, GroupInviteMessageData, SendTemplateData,
  OrderDetailsData, OrderStatusData, AdMessageData, ProductListData,
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

  /** Mark a message as read (and optionally show typing). */
  async markRead(messageId: string, typing?: boolean): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/read`,
      method: HttpMethod.POST,
      body: { messageId, typing },
    });
  }

  /** Send an approved template message (official only). */
  async sendTemplate(data: SendTemplateData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/template`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Send an order with a payment link (Payments BR). */
  async sendOrderDetails(data: OrderDetailsData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/order-details`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Update an order status (official only — Payments BR). */
  async sendOrderStatus(data: OrderStatusData): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/order-status`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Request the recipient to share their location. */
  async sendLocationRequest(to: string, text: string): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/location-request`,
      method: HttpMethod.POST,
      body: { to, text },
    });
  }

  /** Send a message with ad context. */
  async sendAd(data: AdMessageData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/ad`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Send a product list (official only). */
  async sendProductList(data: ProductListData): Promise<SendMessageRoot> {
    return this.http.request<SendMessageRoot>({
      route: `${Routes.MESSAGES}/product-list`,
      method: HttpMethod.POST,
      body: data,
    });
  }

  /** Delete a message by ID. */
  async delete(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

  /** Edit a message by ID, replacing its text. */
  async edit(id: string, text: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${id}/edit`,
      method: HttpMethod.PUT,
      body: { text },
    });
  }

  /** Update a message by ID, replacing its text (alias of {@link edit}). */
  async update(id: string, text: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${id}`,
      method: HttpMethod.PUT,
      body: { text },
    });
  }

  /** Star/keep a message by ID. */
  async keep(id: string): Promise<ApiResponse> {
    return this.http.request<ApiResponse>({
      route: `${Routes.MESSAGES}/${id}/keep`,
      method: HttpMethod.POST,
    });
  }
}
