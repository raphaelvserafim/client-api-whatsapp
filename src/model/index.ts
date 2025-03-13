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
  mark_messages: boolean
  blocked: boolean
  user: User
  phoneConnected: boolean
  webhook: Webhook
}

export interface User {
  id: string
  lid: string
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
