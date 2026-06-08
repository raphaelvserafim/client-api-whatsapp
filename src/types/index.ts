export interface Init {
  server: string;
  key: string;
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

export interface Instance {
  receive_status_message: boolean;
  save_media: boolean;
  receive_presence: boolean;
  permission: number;
  mark_messages: boolean;
  blocked: boolean;
  user?: User;
  phoneConnected: boolean;
  webhook: Webhook;
  businessProfile?: BusinessProfile;
}

export interface User {
  id?: string;
  lid?: string;
  name?: string;
  imageProfile?: string;
}

export interface Webhook {
  allowWebhook: boolean;
  allowNumber?: string;
  webhookMessage: string;
  webhookGroup: string;
  webhookConnection: string;
  webhookQrCode: string;
  webhookMessageFromMe: string;
  webhookHistory: string;
}



export interface SendMessageRoot {
  status: number;
  data: MessageData;
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
  wid: string;
  description: string;
  website: string[];
  category: string;
  business_hours: Record<string, unknown>;
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
