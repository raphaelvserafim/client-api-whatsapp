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
  ACTIONS= 'actions',
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
  REACTION = 'reaction'
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