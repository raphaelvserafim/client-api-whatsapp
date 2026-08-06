/** Provider channel a message is sent through / received from. */
export type Provider = 'whatsapp' | 'instagram' | 'messenger';

export interface Init {
  server: string;
  key: string;
  /** Default provider applied to every send unless overridden per-call. */
  provider?: Provider;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}


export enum Routes {
  INSTANCES = 'instance',
  MESSAGES = 'message',
  CONTACTS = 'contacts',
  GROUPS = 'groups',
  ACTIONS = 'actions',
  CALL = 'call',
  CHAT = 'chat',
  LABELS = 'labels',
  COMMUNITY = 'community',
  BUSINESS = 'business',
  NEWSLETTER = 'newsletter',
  STATUS = 'status',
  TEMPLATES = 'templates',
  ANALYTICS = 'analytics',
  CALLING = 'calling',
  CONVERSATION = 'conversation',
}


export enum TypeMessage {
  PRESENCE = 'presence',
  TEXT = 'text',
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  CONTACT = 'contact',
  LOCATION = 'location',
  REACTION = 'reaction',
  LINK = 'link',
  TITLE = 'title',
  BUTTON_REPLY = 'button_reply',
  BUTTON_ACTION = 'button_action',
  BUTTON_PIX = 'pix',
  POLL = 'survey',
  MENU = 'list',
  STICKER = 'sticker',
  VIDEO_NOTE = 'video-note',
  POLL_V2 = 'poll',
  EVENT = 'event',
  PIN = 'pin',
  CALL_LINK = 'call-link',
}


export enum StatusPresence {
  UNAVAILABLE = 'unavailable',
  AVAILABLE = 'available',
  COMPOSING = 'composing',
  RECORDING = 'recording',
  PAUSED = 'paused',
}


export interface ApiResponse {
  status: number;
  message: string;
}


export interface WebhookBody {
  allowWebhook: boolean;
  allowNumber?: string;
  webhookMessage: string;
  webhookGroup: string;
  webhookConnection: string;
  webhookQrCode: string;
  webhookMessageFromMe: string;
  webhookHistory: string;
}

export interface Contact {
  fullName: string;
  phoneNumber: string;
  organization?: string;
}


export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Row {
  title: string;
  description: string;
  rowId: string;
}

export interface Section {
  title: string;
  rows: Row[];
}

export interface InfoInstance {
  status: number;
  instance: Instance;
}

export interface IInstanceConfig {
  markMessages: boolean
  receiveStatusMessage: boolean
  receivePresence: boolean
  saveMedia: boolean
  permission: number
  proxy: string | null
  mongoDB: {
    uri: string | null
    dbName: string | null
  }
}

export interface Instance {
  mobile: boolean
  socketConnection: number
  user: User
  phoneConnected: boolean
  status: string
  webhook: Webhook
  config: IInstanceConfig
  businessProfile: BusinessProfile
}

export interface User {
  id: string
  name: string
  lid: string
  imageProfile: string
}

export interface Webhook {
  allowWebhook: boolean
  allowNumber: string
  webhookMessage: string
  webhookConnection: string
  webhookGroup: string
  webhookHistory: string
  webhookMessageFromMe: string
  webhookQrCode: string
}

export interface SendMessageRoot {
  status: number;

  message?: string;
  

  /** @deprecated use data instead */
  data?: MessageData;
}

export interface MessageData {
  key: MessageKey;
  message: MessageContent;
  messageTimestamp: string;
  status: string;
}

export interface MessageKey {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}

export interface MessageContent {
  extendedTextMessage?: ExtendedTextMessage;
}

export interface ExtendedTextMessage {
  text: string;
}

export interface Connect {
  status: number;
  phoneConnected: boolean;
  qrcode: string;
  image: string;
  user?: User;
}


export interface PairingCodeResponse {
  status: number;
  code: string;
}


export interface BusinessProfile {
  wid: string
  description: string
  address: string
  email: string
  website: any[]
  category: string
}




export interface Buttons {
  type: "quick_reply" | "cta_copy" | "cta_url" | "cta_call";
  copy_code?: string;
  phone_number?: string;
  url?: string;
  id?: string;
  text: string;
}


export interface Items {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


export interface HeaderMedia {
  title?: string;
  hasMediaAttachment?: boolean;
  imageMessage?: { url: string };
  videoMessage?: { url: string };
  documentMessage?: { url: string; mimetype?: string; fileName?: string };
}


export interface DownloadableMessage {
  mediaKey: string;
  directPath: string;
  url: string;
}


export interface Product {
  name: string;
  description?: string;
  originCountryCode?: string;
  currency?: string;
  price?: number;
  images?: { url: string }[];
}


export interface CommunityCreate {
  name: string;
  subject: string;
}

export interface CommunityUpdate {
  subject: string;
  description: string;
}


export interface GroupParticipantsAction {
  participants: string[];
  action: 'reject' | 'approve';
}


export interface MobileRegisterData {
  phoneNumberCountryCode: string;
  phoneNumberNationalNumber: string;
  phoneNumberMobileNetworkCode: string;
}


export interface EventData {
  to: string;
  name: string;
  description?: string;
  startTime?: string;
  locationName?: string;
  locationAddress?: string;
}


export interface RegisteredResponse {
  status: number;
  registered: boolean;
}


export interface ContactInfo {
  id: string;
  name?: string;
  notify?: string;
  imgUrl?: string;
}


export interface GroupInfo {
  id: string;
  subject: string;
  owner: string;
  creation: number;
  desc?: string;
  participants: GroupParticipant[];
}

export interface GroupParticipant {
  id: string;
  admin?: string;
}


export interface InviteCodeResponse {
  status: number;
  inviteCode: string;
}


export interface ChatInfo {
  id: string;
  name?: string;
  timestamp?: number;
  unreadCount?: number;
}


export interface LabelInfo {
  id: string;
  name: string;
  color?: number;
}


export interface CommunityInfo {
  id: string;
  name: string;
  subject?: string;
  description?: string;
  participants?: GroupParticipant[];
}


export interface CatalogResponse {
  status: number;
  data: Product[];
  cursor?: string;
}


export interface WebhookStatistics {
  status: number;
  data: Record<string, unknown>;
}


export interface ListMessagesResponse {
  status: number;
  data: MessageData[];
  page?: number;
  limit?: number;
  total?: number;
}


export interface DownloadMediaResponse {
  status: number;
  data: string;
}


export interface CallResponse {
  status: number;
  data: Record<string, unknown>;
}


export interface LiveLocationData {
  to: string;
  latitude: number;
  longitude: number;
  caption?: string;
}


export interface SendContactsData {
  to: string;
  displayName: string;
  contacts: Contact[];
}


export interface ProductMessageData {
  to: string;
  businessOwnerJid: string;
  productId: string;
  catalogId: string;
  body?: string;
  footer?: string;
}


export interface GroupInviteMessageData {
  to: string;
  groupJid: string;
  groupName: string;
  inviteCode: string;
  inviteExpiration?: number;
  caption?: string;
}


export interface StatusTextData {
  text: string;
  statusJidList?: string[];
}


export interface StatusMediaData {
  url: string;
  caption?: string;
  statusJidList?: string[];
}


export interface StatusMentionData {
  jid: string;
  statusMsgId: string;
}


export interface NewsletterInfo {
  id: string;
  name?: string;
  description?: string;
  subscribers?: number;
}


export interface CommunityGroupCreate {
  subject: string;
  participants?: string[];
}


// ==================== Official (Cloud API) ====================

/** Mark a message as read (POST /message/read). */
export interface MarkReadData {
  messageId: string;
  typing?: boolean;
}

/** Send an approved template message (POST /message/template — official only). */
export interface SendTemplateData {
  to: string;
  name: string;
  language?: string;
  components?: TemplateComponent[];
  provider?: Provider;
}

/** A component of a WhatsApp message template (header/body/footer/buttons). */
export interface TemplateComponent {
  type: string;
  [key: string]: unknown;
}

/** Tax details for an order (Payments BR). */
export interface OrderTax {
  value?: number;
  description?: string;
}

/** A single line item of an order (Payments BR). */
export interface OrderItem {
  name: string;
  amount: number;
  quantity: number;
  saleAmount?: number;
}

/** Send an order with a payment link (POST /message/order-details — Payments BR). */
export interface OrderDetailsData {
  to: string;
  text: string;
  title: string;
  referenceId: string;
  paymentLinkUri: string;
  totalAmount: number;
  subtotal: number;
  tax?: OrderTax;
  items: OrderItem[];
}

/** Update an order status (POST /message/order-status — official only, Payments BR). */
export interface OrderStatusData {
  to: string;
  referenceId: string;
  status: string;
  description?: string;
}

/** Request the recipient to share their location (POST /message/location-request). */
export interface LocationRequestData {
  to: string;
  text: string;
}

/** Send a message with ad context (POST /message/ad). */
export interface AdMessageData {
  to: string;
  text: string;
  url?: string;
  sourceId?: string;
  sourceUrl?: string;
  title?: string;
  body?: string;
  mentions?: string[];
}

/** Send a product list (POST /message/product-list — official only). */
export interface ProductListData {
  to: string;
  header: string;
  body: string;
  sections: Section[];
  footer?: string;
  catalogId: string;
}

/** Inject audio into an active call (POST /call/{callId}/audio). */
export interface CallAudioData {
  file?: string;
  url?: string;
  base64?: string;
}

/** Commerce settings (GET/POST /business/commerce-settings — official only). */
export interface CommerceSettings {
  isCartEnabled?: boolean;
  isCatalogVisible?: boolean;
}

/** Create a message template (POST /templates — official only). */
export interface CreateTemplateData {
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  components: TemplateComponent[];
  allow_category_change?: boolean;
}

/** Edit a message template (PUT /templates/{id} — official only). */
export interface UpdateTemplateData {
  category?: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  components?: TemplateComponent[];
}

/** Query range for analytics endpoints (official only). */
export interface AnalyticsQuery {
  start?: string;
  end?: string;
  granularity?: string;
}

/** Control a call (POST /calling/call — official only). */
export interface CallControlData {
  action: string;
  to?: string;
  callId?: string;
  sdp?: string;
  sdpType?: string;
}

/** Conversational components (POST /conversation — official only). */
export interface ConversationComponentsData {
  enableWelcomeMessage?: boolean;
  prompts?: unknown[];
  commands?: unknown[];
}
