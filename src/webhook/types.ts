import { Provider } from '../types';

export type { Provider };

// ==================== Raw Meta ("wame") envelope ====================
// Shape of the JSON delivered to the webhook URL when the instance is
// configured with `webhookFormat: "meta"`. Fields are kept close to the
// wire format (snake_case) since this is the untouched incoming payload.

export interface WameWebhookMetadataRaw {
  phone_number_id?: string;
  display_phone_number?: string;
}

export interface WameWebhookValue {
  messaging_product?: string;
  metadata?: WameWebhookMetadataRaw;
  messages?: any[];
  statuses?: any[];
  contacts?: any[];
  presence?: any;
  connection?: any;
  qrcode?: any;
  calls?: any[];
  groups?: any;
  health?: any;
  errors?: any[];
  [key: string]: any;
}

export interface WameWebhookChange {
  field: string;
  value: WameWebhookValue;
}

export interface WameWebhookEntry {
  id: string;
  changes: WameWebhookChange[];
}

export interface WameWebhookEnvelope {
  object: string;
  /** Channel this event came from: "whatsapp" | "instagram" | "messenger". */
  provider?: Provider;
  /** Your instance key — the value you use in the API routes. */
  instance?: string;
  /** True when delivered via the official Meta Cloud API (vs. unofficial/QR). */
  official?: boolean;
  entry: WameWebhookEntry[];
}

// ==================== Common (normalized) ====================

export interface WebhookMetadata {
  /** changes[].value.metadata.phone_number_id — the instance key. */
  phoneNumberId: string;
  /** The connected WhatsApp phone number, when present. */
  displayPhoneNumber?: string;
}

export interface WebhookError {
  code?: number;
  title?: string;
  message?: string;
  /** Lifted from the incoming `error_data.details`. */
  details?: string;
  [key: string]: any;
}

export interface WebhookEventBase {
  /**
   * entry[].id — the account identifier. On WhatsApp this derives from the
   * instance; on Instagram/Messenger it is the IG/Page account id, so use
   * `instance` (or `metadata.phoneNumberId`) to route by instance.
   */
  instanceId: string;
  /** Envelope `instance` — your instance key, on every channel. */
  instance?: string;
  metadata: WebhookMetadata;
  /** Original event category ("messages", "connection", "groups", ...). */
  field: string;
  /** Channel this event came from: "whatsapp" | "instagram" | "messenger". */
  provider?: Provider;
  /** True when delivered via the official Meta Cloud API (vs. unofficial/QR). */
  official?: boolean;
  /** Escape hatch: the untouched incoming envelope. */
  raw: WameWebhookEnvelope;
}

// ==================== Media / sub-payloads ====================

export interface WebhookMedia {
  /** Media id. Absent on Instagram/Messenger, where only `url` is delivered. */
  id?: string;
  /** GET {URL_SERVER}/{key}/message/{id}/media — on Instagram/Messenger, the CDN URL. */
  url?: string;
  mimeType?: string;
  sha256?: string;
  caption?: string;
}

export interface WebhookAudio extends WebhookMedia {
  voice?: boolean;
}

export interface WebhookDocument extends WebhookMedia {
  filename?: string;
}

export interface WebhookSticker extends WebhookMedia {
  animated?: boolean;
}

export interface WebhookLocation {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

export interface WebhookContactCard {
  name?: {
    formatted_name?: string;
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
  phones?: Array<{ phone?: string; wa_id?: string; type?: string }>;
  vcard?: string;
  [key: string]: any;
}

export interface WebhookMessageContext {
  from?: string;
  id: string;
  /**
   * Present when the message is a reply to a story (Instagram). `id` is the
   * story id and `story.url` the story media.
   */
  story?: { url?: string; [key: string]: any };
}

export interface WebhookReferral {
  sourceUrl?: string;
  sourceId?: string;
  sourceType?: string;
  headline?: string;
  body?: string;
  mediaType?: string;
  thumbnailUrl?: string;
  /** Click-to-WhatsApp ad click id, for attribution. */
  ctwaClid?: string;
}

// ==================== Message events (field: "messages") ====================

/** Sender profile carried by the incoming payload (Instagram/Messenger enrich this). */
export interface WebhookSenderProfile {
  name?: string;
  username?: string;
  picture?: string;
}

export interface MessageEventBase extends WebhookEventBase {
  field: 'messages';
  /** Sender JID / wa_id. */
  from: string;
  /** Provider-scoped sender id (from_user_id) — e.g. Instagram/Messenger user id. */
  fromUserId?: string;
  /** Sender profile (name/username/picture) when the payload includes contacts. */
  profile?: WebhookSenderProfile;
  /** WhatsApp message id (wamid). */
  messageId: string;
  timestamp?: string;
  /** True when the message was sent by the connected account (echo). */
  fromMe?: boolean;
  /** Conversation kind, as reported by the payload (WhatsApp). */
  chatType?: 'individual' | 'group';
  /** Group JID (e.g. "123-456@g.us") when the message came from a group. */
  groupId?: string;
  /** Quoted message, when this is a reply (or the story, on Instagram replies). */
  context?: WebhookMessageContext;
  /** Click-to-WhatsApp / ad referral attached to the message. */
  referral?: WebhookReferral;
}

export interface TextMessageEvent extends MessageEventBase {
  type: 'text';
  text: { body: string };
}

export interface ImageMessageEvent extends MessageEventBase {
  type: 'image';
  image: WebhookMedia;
}

export interface AudioMessageEvent extends MessageEventBase {
  type: 'audio';
  audio: WebhookAudio;
}

export interface VideoMessageEvent extends MessageEventBase {
  type: 'video';
  video: WebhookMedia;
}

export interface DocumentMessageEvent extends MessageEventBase {
  type: 'document';
  document: WebhookDocument;
}

export interface StickerMessageEvent extends MessageEventBase {
  type: 'sticker';
  sticker: WebhookSticker;
}

export interface LocationMessageEvent extends MessageEventBase {
  type: 'location';
  location: WebhookLocation;
}

export interface ContactsMessageEvent extends MessageEventBase {
  type: 'contacts';
  contacts: WebhookContactCard[];
}

export interface ReactionMessageEvent extends MessageEventBase {
  type: 'reaction';
  reaction: { messageId: string; emoji: string };
}

export interface ReactionRemovedMessageEvent extends MessageEventBase {
  type: 'reaction-removed';
  reaction: { messageId: string };
}

export interface ButtonMessageEvent extends MessageEventBase {
  type: 'button';
  button: { text?: string; payload?: string };
}

export interface ListReplyMessageEvent extends MessageEventBase {
  type: 'list-reply';
  listReply: { id: string; title: string; description?: string };
}

export interface ButtonReplyMessageEvent extends MessageEventBase {
  type: 'button-reply';
  buttonReply: { id: string; title: string };
}

export interface ReferralMessageEvent extends MessageEventBase {
  type: 'referral';
  referral: WebhookReferral;
}

export interface EditMessageEvent extends MessageEventBase {
  type: 'edit';
  edit: {
    /** Id of the message that was edited. */
    originalMessageId: string;
    /** New body, when the edited message is a text message. */
    text?: string;
    /** Type of the edited message ("text", "image", ...). */
    messageType?: string;
    /** The full edited message object, for types other than text. */
    message?: any;
  };
}

export interface UnsupportedMessageEvent extends MessageEventBase {
  type: 'unsupported';
  errors?: WebhookError[];
}

export type WebhookMessageEvent =
  | TextMessageEvent
  | ImageMessageEvent
  | AudioMessageEvent
  | VideoMessageEvent
  | DocumentMessageEvent
  | StickerMessageEvent
  | LocationMessageEvent
  | ContactsMessageEvent
  | ReactionMessageEvent
  | ReactionRemovedMessageEvent
  | ButtonMessageEvent
  | ListReplyMessageEvent
  | ButtonReplyMessageEvent
  | ReferralMessageEvent
  | EditMessageEvent
  | UnsupportedMessageEvent;

// ==================== Status events (field: "messages") ====================

export type WebhookStatusValue = 'sent' | 'delivered' | 'read' | 'played' | 'failed';

export interface StatusEvent extends WebhookEventBase {
  field: 'messages';
  type: 'status';
  status: WebhookStatusValue;
  /** Id of the message this receipt refers to. Absent on Messenger read receipts. */
  messageId?: string;
  recipientId?: string;
  timestamp?: string;
  recipientType?: 'individual' | 'group';
  /** Participant JID for group message status (recipient_participant_id). */
  participantId?: string;
  errors?: WebhookError[];
  /** Meta-compatibility placeholders, usually null on this API. */
  conversation?: unknown;
  pricing?: unknown;
}

// ==================== Presence (field: "presence") ====================

export interface PresenceEvent extends WebhookEventBase {
  field: 'presence';
  type: 'presence';
  waId: string;
  /** available | unavailable | typing | recording */
  status: string;
}

// ==================== Connection (field: "connection") ====================

export interface ConnectionOpenEvent extends WebhookEventBase {
  field: 'connection';
  type: 'connection.open';
  code?: number;
}

export interface ConnectionCloseEvent extends WebhookEventBase {
  field: 'connection';
  type: 'connection.close';
  code?: number;
  reason?: string;
}

// ==================== QR code (field: "qrcode") ====================

export interface QrCodeEvent extends WebhookEventBase {
  field: 'qrcode';
  type: 'qrcode';
  /** base64-encoded PNG image data. */
  code: string;
}

// ==================== Call (field: "call") ====================

export interface CallEvent extends WebhookEventBase {
  field: 'call';
  type: 'call';
  callId: string;
  from: string;
  /** Full JID of the caller (e.g. "5511999998888@s.whatsapp.net"). */
  fromJid?: string;
  /** e.g. "offer" */
  status: string;
  isVideo?: boolean;
  isGroup?: boolean;
  timestamp?: string;
}

// ==================== Group (field: "groups") ====================

export interface GroupParticipantsEvent extends WebhookEventBase {
  field: 'groups';
  type: 'group.participants';
  groupId?: string;
  /** add | remove | promote | demote */
  action: string;
  participants: string[];
}

export interface GroupUpdateEvent extends WebhookEventBase {
  field: 'groups';
  type: 'group.update';
  data: Array<{ id?: string; subject?: string; description?: string; [key: string]: any }>;
}

// ==================== Health (field: "health") ====================

export interface HealthEvent extends WebhookEventBase {
  field: 'health';
  type: 'health';
  /** healthy | restricted */
  status: string;
  previous?: string;
  reason?: string;
  shouldPause?: boolean;
  shouldRotate?: boolean;
}

// ==================== Fallback ====================

export interface UnknownEvent extends WebhookEventBase {
  type: 'unknown';
}

// ==================== Union ====================

export type WhatsAppWebhookEvent =
  | WebhookMessageEvent
  | StatusEvent
  | PresenceEvent
  | ConnectionOpenEvent
  | ConnectionCloseEvent
  | QrCodeEvent
  | CallEvent
  | GroupParticipantsEvent
  | GroupUpdateEvent
  | HealthEvent
  | UnknownEvent;

export type WebhookEventType = WhatsAppWebhookEvent['type'];

/** Maps each event `type` to its concrete event interface. */
export type WebhookEventMap = {
  [E in WhatsAppWebhookEvent as E['type']]: E;
};
