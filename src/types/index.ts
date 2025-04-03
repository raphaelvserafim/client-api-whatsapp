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
}


export enum StatusPresence {
  UNAVAILABLE = 'unavailable',
  AVAILABLE = 'available',
  COMPOSING = 'composing',
  RECORDING = 'recording',
  PAUSED = 'paused',
}



export interface WebhookBody {
  allowWebhook: boolean;
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
  status: number
  instance: Instance
}

export interface Instance {
  receive_status_message: boolean
  save_media: boolean
  receive_presence: boolean
  permission: number
  mark_messages: boolean
  blocked: boolean
  user?: User
  phoneConnected: boolean
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
  allowWebhook: boolean
  webhookMessage: string
  webhookGroup: string
  webhookConnection: string
  webhookQrCode: string
  webhookMessageFromMe: string
  webhookHistory: string
}



export interface SendMessageRoot {
  status: number
  data: Data
}

export interface Data {
  key: Key
  message: Message
  messageTimestamp: string
  status: string
}

export interface Key {
  remoteJid: string
  fromMe: boolean
  id: string
}

export interface Message {
  extendedTextMessage: ExtendedTextMessage
}

export interface ExtendedTextMessage {
  text: string
}

export interface Connect {
  status: number;
  phoneConnected: boolean;
  qrcode: string;
  image: string;
  user?: User;
}



export interface BusinessProfile {
  wid: string
  description: string
  website: any[]
  category: string
  business_hours: {}
}



export interface Buttons {
  type: "quick_reply" | "cta_copy" | "cta_url" | "cta_call",
  copy_code?: string,
  phone_number?: string,
  url?: string,
  id?: string,
  text: string;
}


export interface Items {
  id: string,
  name: string,
  price: number,
  quantity: number
}