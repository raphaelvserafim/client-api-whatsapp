import {
  WameWebhookEnvelope,
  WameWebhookChange,
  WebhookMetadata,
  WebhookEventBase,
  MessageEventBase,
  WhatsAppWebhookEvent,
  WebhookMessageEvent,
  WebhookMedia,
  WebhookAudio,
  WebhookDocument,
  WebhookSticker,
  WebhookLocation,
  WebhookContactCard,
  WebhookReferral,
  WebhookStatusValue,
  WebhookSenderProfile,
  WebhookError,
  WebhookMessageContext,
} from './types';

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}

function toMetadata(raw: any): WebhookMetadata {
  return {
    phoneNumberId: raw?.phone_number_id ?? '',
    displayPhoneNumber: raw?.display_phone_number,
  };
}

function toMedia(raw: any): WebhookMedia {
  return {
    id: raw?.id,
    url: raw?.url,
    mimeType: raw?.mime_type,
    sha256: raw?.sha256,
    caption: raw?.caption,
  };
}

/** Keep the original error keys and lift the nested `error_data.details`. */
function toErrors(raw: any): WebhookError[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  return raw.map((err: any) => {
    if (!isObject(err)) return err;
    const details = err.error_data?.details ?? err.details;
    return details !== undefined ? { ...err, details } : { ...err };
  });
}

/** Find the contact entry matching this message and map its profile. */
function resolveProfile(msg: any, contacts: any): WebhookSenderProfile | undefined {
  if (!Array.isArray(contacts) || contacts.length === 0) return undefined;
  const match =
    contacts.find(
      (c: any) =>
        (msg?.from_user_id && c?.user_id === msg.from_user_id) ||
        (msg?.from && c?.wa_id === msg.from),
    ) ?? contacts[0];
  const profile = match?.profile;
  if (!isObject(profile)) return undefined;
  const mapped: WebhookSenderProfile = {};
  if (profile.name !== undefined) mapped.name = profile.name;
  if (profile.username !== undefined) mapped.username = profile.username;
  if (profile.picture !== undefined) mapped.picture = profile.picture;
  return Object.keys(mapped).length > 0 ? mapped : undefined;
}

function toReferral(raw: any): WebhookReferral {
  return {
    sourceUrl: raw?.source_url,
    sourceId: raw?.source_id,
    sourceType: raw?.source_type,
    headline: raw?.headline,
    body: raw?.body,
    mediaType: raw?.media_type,
    thumbnailUrl: raw?.thumbnail_url,
    ctwaClid: raw?.ctwa_clid,
  };
}

/**
 * Parse a single message object (Meta format) into a normalized event.
 * Falls back to an `unsupported` event when the message type is unknown.
 */
function mapMessage(msg: any, base: WebhookEventBase, contacts?: any): WebhookMessageEvent {
  const messageBase: MessageEventBase = {
    ...base,
    field: 'messages',
    from: msg?.from,
    messageId: msg?.id,
    timestamp: msg?.timestamp,
  };

  if (msg?.from_user_id) messageBase.fromUserId = msg.from_user_id;
  const profile = resolveProfile(msg, contacts);
  if (profile) messageBase.profile = profile;
  if (msg?.from_me === true) messageBase.fromMe = true;
  if (msg?.chat_type) messageBase.chatType = msg.chat_type;
  if (msg?.group_id) messageBase.groupId = msg.group_id;
  if (isObject(msg?.context)) {
    const context: WebhookMessageContext = { from: msg.context.from, id: msg.context.id };
    // Instagram story replies carry the story being replied to.
    if (isObject(msg.context.story)) context.story = msg.context.story;
    messageBase.context = context;
  }
  if (isObject(msg?.referral)) messageBase.referral = toReferral(msg.referral);

  // Edited messages carry an `edit` block regardless of the original type.
  if (isObject(msg?.edit)) {
    // The new content lives in `edit.message` ({ type, text: { body } }).
    const edited = isObject(msg.edit.message) ? msg.edit.message : undefined;
    return {
      ...messageBase,
      type: 'edit',
      edit: {
        originalMessageId: msg.edit.original_message_id ?? msg.edit.originalMessageId,
        text: edited?.text?.body ?? msg.edit.text?.body ?? msg.edit.text,
        messageType: edited?.type,
        message: edited,
      },
    };
  }

  switch (msg?.type) {
    case 'text':
      return { ...messageBase, type: 'text', text: { body: msg.text?.body ?? '' } };

    case 'image':
      return { ...messageBase, type: 'image', image: toMedia(msg.image) };

    case 'audio': {
      const audio: WebhookAudio = { ...toMedia(msg.audio), voice: msg.audio?.voice };
      return { ...messageBase, type: 'audio', audio };
    }

    case 'video':
      return { ...messageBase, type: 'video', video: toMedia(msg.video) };

    case 'document': {
      const document: WebhookDocument = { ...toMedia(msg.document), filename: msg.document?.filename };
      return { ...messageBase, type: 'document', document };
    }

    case 'sticker': {
      const sticker: WebhookSticker = { ...toMedia(msg.sticker), animated: msg.sticker?.animated };
      return { ...messageBase, type: 'sticker', sticker };
    }

    case 'location': {
      const location: WebhookLocation = {
        latitude: msg.location?.latitude,
        longitude: msg.location?.longitude,
        name: msg.location?.name,
        address: msg.location?.address,
      };
      return { ...messageBase, type: 'location', location };
    }

    case 'contacts': {
      const contacts: WebhookContactCard[] = Array.isArray(msg.contacts) ? msg.contacts : [];
      return { ...messageBase, type: 'contacts', contacts };
    }

    case 'reaction': {
      const messageId = msg.reaction?.message_id ?? msg.reaction?.messageId;
      const emoji = msg.reaction?.emoji;
      if (emoji) {
        return { ...messageBase, type: 'reaction', reaction: { messageId, emoji } };
      }
      return { ...messageBase, type: 'reaction-removed', reaction: { messageId } };
    }

    case 'button':
      return {
        ...messageBase,
        type: 'button',
        button: { text: msg.button?.text, payload: msg.button?.payload },
      };

    case 'interactive': {
      const interactive = msg.interactive ?? {};
      if (isObject(interactive.list_reply)) {
        return {
          ...messageBase,
          type: 'list-reply',
          listReply: {
            id: interactive.list_reply.id,
            title: interactive.list_reply.title,
            description: interactive.list_reply.description,
          },
        };
      }
      if (isObject(interactive.button_reply)) {
        return {
          ...messageBase,
          type: 'button-reply',
          buttonReply: {
            id: interactive.button_reply.id,
            title: interactive.button_reply.title,
          },
        };
      }
      return { ...messageBase, type: 'unsupported', errors: toErrors(msg.errors) };
    }

    default:
      // A referral-only message with no recognized primary type.
      if (isObject(msg?.referral)) {
        return { ...messageBase, type: 'referral', referral: toReferral(msg.referral) };
      }
      return { ...messageBase, type: 'unsupported', errors: toErrors(msg?.errors) };
  }
}

function mapChange(
  change: WameWebhookChange,
  base: WebhookEventBase,
): WhatsAppWebhookEvent[] {
  const value = change?.value ?? ({} as WameWebhookChange['value']);
  const events: WhatsAppWebhookEvent[] = [];

  switch (change?.field) {
    case 'messages': {
      if (Array.isArray(value.messages)) {
        for (const msg of value.messages) events.push(mapMessage(msg, base, value.contacts));
      }
      if (Array.isArray(value.statuses)) {
        for (const st of value.statuses) {
          events.push({
            ...base,
            field: 'messages',
            type: 'status',
            status: st?.status as WebhookStatusValue,
            messageId: st?.id,
            recipientId: st?.recipient_id,
            timestamp: st?.timestamp,
            recipientType: st?.recipient_type,
            participantId: st?.recipient_participant_id ?? st?.participant_id,
            errors: toErrors(st?.errors),
            conversation: st?.conversation ?? null,
            pricing: st?.pricing ?? null,
          });
        }
      }
      break;
    }

    case 'presence': {
      const presence = value.presence ?? {};
      events.push({
        ...base,
        field: 'presence',
        type: 'presence',
        waId: presence.wa_id,
        status: presence.status,
      });
      break;
    }

    case 'connection': {
      const connection = value.connection ?? {};
      if (connection.status === 'close') {
        events.push({
          ...base,
          field: 'connection',
          type: 'connection.close',
          code: connection.code,
          reason: connection.reason,
        });
      } else {
        events.push({
          ...base,
          field: 'connection',
          type: 'connection.open',
          code: connection.code,
        });
      }
      break;
    }

    case 'qrcode': {
      events.push({
        ...base,
        field: 'qrcode',
        type: 'qrcode',
        code: value.qrcode?.code,
      });
      break;
    }

    case 'call': {
      const calls = Array.isArray(value.calls) ? value.calls : [];
      for (const c of calls) {
        events.push({
          ...base,
          field: 'call',
          type: 'call',
          callId: c?.id,
          from: c?.from,
          fromJid: c?.from_jid,
          status: c?.status,
          isVideo: c?.is_video,
          isGroup: c?.is_group,
          timestamp: c?.timestamp,
        });
      }
      break;
    }

    case 'groups': {
      const groups = value.groups ?? {};
      if (groups.event === 'update') {
        events.push({
          ...base,
          field: 'groups',
          type: 'group.update',
          data: Array.isArray(groups.data) ? groups.data : [],
        });
      } else {
        events.push({
          ...base,
          field: 'groups',
          type: 'group.participants',
          groupId: groups.id ?? groups.group_id,
          action: groups.action,
          participants: Array.isArray(groups.participants) ? groups.participants : [],
        });
      }
      break;
    }

    case 'health': {
      const health = value.health ?? {};
      events.push({
        ...base,
        field: 'health',
        type: 'health',
        status: health.status,
        previous: health.previous,
        reason: health.reason,
        shouldPause: health.should_pause,
        shouldRotate: health.should_rotate,
      });
      break;
    }

    default:
      events.push({ ...base, type: 'unknown' });
      break;
  }

  return events;
}

/**
 * Parse an incoming WhatsApp webhook payload (Meta / "wame" envelope format)
 * into an array of normalized, fully-typed events.
 *
 * A single POST can batch multiple entries / changes / messages, so this
 * always returns an array. It never throws on shape: an unrecognized field
 * becomes an `unknown` event, and a body that is not a valid envelope
 * returns an empty array — so your endpoint can always respond 200.
 */
export function parseWebhook(body: unknown): WhatsAppWebhookEvent[] {
  if (!isObject(body) || !Array.isArray(body.entry)) return [];

  const envelope = body as WameWebhookEnvelope;
  const events: WhatsAppWebhookEvent[] = [];

  for (const entry of envelope.entry) {
    if (!isObject(entry)) continue;
    const changes = Array.isArray(entry.changes) ? entry.changes : [];

    for (const change of changes) {
      if (!isObject(change)) continue;
      const base: WebhookEventBase = {
        instanceId: entry.id,
        metadata: toMetadata(change.value?.metadata),
        field: change.field,
        raw: envelope,
      };
      if (envelope.provider !== undefined) base.provider = envelope.provider;
      if (envelope.instance !== undefined) base.instance = envelope.instance;
      if (envelope.official !== undefined) base.official = envelope.official;
      events.push(...mapChange(change, base));
    }
  }

  return events;
}

export default parseWebhook;
