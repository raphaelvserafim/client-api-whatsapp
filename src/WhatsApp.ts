import {
  Init, WebhookBody, TypeMessage, StatusPresence, Contact, Section,
  Location, Buttons, Items, HeaderMedia, DownloadableMessage, Product,
  CommunityCreate, CommunityUpdate, GroupParticipantsAction,
  ApiResponse, PairingCodeResponse, MobileRegisterData, EventData,
  InfoInstance, SendMessageRoot, Connect, RegisteredResponse,
  ContactInfo, GroupInfo, InviteCodeResponse, ChatInfo, LabelInfo,
  CommunityInfo, CatalogResponse, WebhookStatistics, ListMessagesResponse,
  DownloadMediaResponse, CallResponse, MessageData, GroupParticipant,
} from './types';
import { IHttpClient } from './client/IHttpClient';
import { HttpClient } from './client/HttpClient';
import { InstanceService } from './services/InstanceService';
import { MessageService } from './services/MessageService';
import { ChatService } from './services/ChatService';
import { CallService } from './services/CallService';
import { LabelService } from './services/LabelService';
import { ActionService } from './services/ActionService';
import { ContactService } from './services/ContactService';
import { GroupService } from './services/GroupService';
import { CommunityService } from './services/CommunityService';
import { BusinessService } from './services/BusinessService';

export class WhatsApp {
  readonly instance: InstanceService;
  readonly message: MessageService;
  readonly chat: ChatService;
  readonly call: CallService;
  readonly label: LabelService;
  readonly action: ActionService;
  readonly contact: ContactService;
  readonly group: GroupService;
  readonly community: CommunityService;
  readonly business: BusinessService;

  constructor(data: Init, httpClient?: IHttpClient) {
    const client = httpClient ?? new HttpClient(`${data.server}/${data.key}`);

    this.instance = new InstanceService(client);
    this.message = new MessageService(client);
    this.chat = new ChatService(client);
    this.call = new CallService(client);
    this.label = new LabelService(client);
    this.action = new ActionService(client);
    this.contact = new ContactService(client);
    this.group = new GroupService(client);
    this.community = new CommunityService(client);
    this.business = new BusinessService(client);
  }

  // ==================== Backward Compatibility ====================
  // These methods delegate to the corresponding services.
  // Use wa.instance.*, wa.message.*, wa.group.*, etc. for the new API.

  // Instance
  connect(): Promise<Connect> { return this.instance.connect(); }
  info(): Promise<InfoInstance> { return this.instance.info(); }
  logout(): Promise<ApiResponse> { return this.instance.logout(); }
  setting(data: { markMessageRead: boolean; saveMedia: boolean; receiveStatusMessage: boolean; receivePresence: boolean }): Promise<ApiResponse> { return this.instance.setting(data); }
  updateWebhook(body: WebhookBody): Promise<ApiResponse> { return this.instance.updateWebhook(body); }
  pairingCode(phoneNumber: string): Promise<PairingCodeResponse> { return this.instance.pairingCode(phoneNumber); }
  addMongoDb(uri: string, dbName: string): Promise<ApiResponse> { return this.instance.addMongoDb(uri, dbName); }
  setProxy(proxy: string): Promise<ApiResponse> { return this.instance.setProxy(proxy); }
  restart(): Promise<ApiResponse> { return this.instance.restart(); }
  updateProfileStatus(text: string): Promise<ApiResponse> { return this.instance.updateProfileStatus(text); }
  updateProfilePicture(url: string): Promise<ApiResponse> { return this.instance.updateProfilePicture(url); }
  removeProfilePicture(): Promise<ApiResponse> { return this.instance.removeProfilePicture(); }
  updateProfileName(name: string): Promise<ApiResponse> { return this.instance.updateProfileName(name); }
  mobileRegisterPrepare(data: MobileRegisterData): Promise<ApiResponse> { return this.instance.mobileRegisterPrepare(data); }
  mobileRequestCode(method: string): Promise<ApiResponse> { return this.instance.mobileRequestCode(method); }
  mobileVerifyCode(code: string): Promise<ApiResponse> { return this.instance.mobileVerifyCode(code); }
  webhookStatistics(): Promise<WebhookStatistics> { return this.instance.webhookStatistics(); }

  // Messages
  listMessages(phoneNumber: string, page?: number, limit?: number): Promise<ListMessagesResponse> { return this.message.list(phoneNumber, page, limit); }
  sendMessage(
    data: {
      type: TypeMessage;
      body: {
        to: string; msgId?: string; header?: HeaderMedia; status?: StatusPresence;
        text?: string; url?: string; caption?: string; mimetype?: string; fileName?: string;
        contact?: Contact; location?: Location; name?: string; options?: string[];
        sections?: Section[]; buttons?: Buttons[]; footer?: string; description?: string;
        title?: string; buttonText?: string; thumbnailUrl?: string; sourceUrl?: string;
        referenceId?: string; code?: string; key?: string; merchantName?: string;
        keyType?: "CNPJ" | "CPF" | "EMAIL" | "PHONE"; subtotal?: string;
        totalAmount?: string; items?: Items[];
      };
    },
    reply?: boolean,
  ): Promise<SendMessageRoot> { return this.message.send(data, reply); }
  forwardingMessage(to: string, msgId: string): Promise<SendMessageRoot> { return this.message.forward(to, msgId); }
  sendSticker(to: string, url: string): Promise<SendMessageRoot> { return this.message.sendSticker(to, url); }
  sendVideoNote(to: string, url: string): Promise<SendMessageRoot> { return this.message.sendVideoNote(to, url); }
  sendPoll(to: string, name: string, values: Array<string | number | boolean>, selectableCount?: number): Promise<SendMessageRoot> { return this.message.sendPoll(to, name, values, selectableCount); }
  sendEvent(data: EventData): Promise<SendMessageRoot> { return this.message.sendEvent(data); }
  pinMessage(id: string, duration?: number): Promise<ApiResponse> { return this.message.pin(id, duration); }
  sendCallLink(to: string, type: string, caption?: string): Promise<SendMessageRoot> { return this.message.sendCallLink(to, type, caption); }
  sendImageBase64(to: string, base64: string, caption?: string): Promise<SendMessageRoot> { return this.message.sendImageBase64(to, base64, caption); }
  sendAudioBase64(to: string, base64: string): Promise<SendMessageRoot> { return this.message.sendAudioBase64(to, base64); }
  sendDocumentBase64(to: string, base64: string, mimetype: string, fileName?: string, caption?: string): Promise<SendMessageRoot> { return this.message.sendDocumentBase64(to, base64, mimetype, fileName, caption); }

  // Chat
  getChats(): Promise<{ status: number; data: ChatInfo[] }> { return this.chat.list(); }
  modifyChat(id: string, action: 'markRead' | 'pin', value: boolean): Promise<ApiResponse> { return this.chat.modify(id, action, value); }
  deleteChat(chatId: string): Promise<ApiResponse> { return this.chat.delete(chatId); }
  getChatMessages(chatId: string): Promise<{ status: number; data: MessageData[] }> { return this.chat.messages(chatId); }

  // Call
  makeCall(to: string, isVideo?: boolean): Promise<CallResponse> { return this.call.call(to, isVideo); }
  rejectCall(id: string, from: string): Promise<ApiResponse> { return this.call.reject(id, from); }

  // Labels
  getLabels(): Promise<{ status: number; data: LabelInfo[] }> { return this.label.list(); }
  createLabel(name: string, labelId?: string): Promise<ApiResponse> { return this.label.create(name, labelId); }
  getChatLabel(labelId: string): Promise<{ status: number; data: ChatInfo[] }> { return this.label.getChats(labelId); }
  addChatLabel(labelId: string, to: string): Promise<ApiResponse> { return this.label.addToChat(labelId, to); }
  removeChatLabel(labelId: string, to: string): Promise<ApiResponse> { return this.label.removeFromChat(labelId, to); }

  // Actions
  checkRegisteredWhatsapp(number: string): Promise<RegisteredResponse> { return this.action.checkRegistered(number); }
  downloadMedia(type: 'image' | 'video' | 'sticker' | 'audio' | 'document', message: DownloadableMessage): Promise<DownloadMediaResponse> { return this.action.downloadMedia(type, message); }
  deleteStorage(): Promise<ApiResponse> { return this.action.deleteStorage(); }

  // Contacts
  contacts(): Promise<{ status: number; data: ContactInfo[] }> { return this.contact.list(); }
  contactProfile(id: string): Promise<{ status: number; data: ContactInfo }> { return this.contact.profile(id); }
  blockContact(number: string, action: 'block' | 'unblock'): Promise<ApiResponse> { return this.contact.block(number, action); }

  // Groups
  groups(): Promise<{ status: number; data: GroupInfo[] }> { return this.group.list(); }
  infoGroup(id: string): Promise<{ status: number; data: GroupInfo }> { return this.group.info(id); }
  createGroup(name: string, participants: string[]): Promise<{ status: number; data: GroupInfo }> { return this.group.create(name, participants); }
  updateGroup(id: string, name: string, description: string): Promise<ApiResponse> { return this.group.update(id, name, description); }
  changeGroupSettings(id: string, setting: 'announcement' | 'not_announcement' | 'locked' | 'unlocked'): Promise<ApiResponse> { return this.group.changeSettings(id, setting); }
  leaveGroup(id: string): Promise<ApiResponse> { return this.group.leave(id); }
  getInviteGroup(id: string): Promise<InviteCodeResponse> { return this.group.getInviteCode(id); }
  updateGroupPicture(id: string, url: string): Promise<ApiResponse> { return this.group.updatePicture(id, url); }
  removeGroupPicture(id: string): Promise<ApiResponse> { return this.group.removePicture(id); }
  addParticipantsGroup(id: string, participants: string[]): Promise<ApiResponse> { return this.group.addParticipants(id, participants); }
  removeParticipantsGroup(id: string, participants: string[]): Promise<ApiResponse> { return this.group.removeParticipants(id, participants); }
  updateGroupParticipantRole(id: string, action: 'promote' | 'demote', participants: string[]): Promise<ApiResponse> { return this.group.updateParticipantRole(id, action, participants); }
  getGroupRequestParticipants(id: string): Promise<{ status: number; data: GroupParticipant[] }> { return this.group.getRequestParticipants(id); }
  updateGroupRequestParticipants(id: string, data: GroupParticipantsAction): Promise<ApiResponse> { return this.group.updateRequestParticipants(id, data); }

  // Community
  listCommunities(): Promise<{ status: number; data: CommunityInfo[] }> { return this.community.list(); }
  createCommunity(data: CommunityCreate): Promise<{ status: number; data: CommunityInfo }> { return this.community.create(data); }
  infoCommunity(id: string): Promise<{ status: number; data: CommunityInfo }> { return this.community.info(id); }
  updateCommunity(id: string, data: CommunityUpdate): Promise<ApiResponse> { return this.community.update(id, data); }
  leaveCommunity(id: string): Promise<ApiResponse> { return this.community.leave(id); }
  updateCommunityPicture(id: string, url: string): Promise<ApiResponse> { return this.community.updatePicture(id, url); }
  getCommunityInviteCode(id: string): Promise<InviteCodeResponse> { return this.community.getInviteCode(id); }
  removeCommunityParticipants(id: string, participants: string[]): Promise<ApiResponse> { return this.community.removeParticipants(id, participants); }
  getCommunityRequestParticipants(id: string): Promise<{ status: number; data: GroupParticipant[] }> { return this.community.getRequestParticipants(id); }
  updateCommunityRequestParticipants(id: string, data: GroupParticipantsAction): Promise<ApiResponse> { return this.community.updateRequestParticipants(id, data); }

  // Business
  getCatalog(limit?: number, cursor?: string): Promise<CatalogResponse> { return this.business.getCatalog(limit, cursor); }
  createProduct(product: Product): Promise<ApiResponse> { return this.business.createProduct(product); }
  updateProduct(productId: string, product: Product): Promise<ApiResponse> { return this.business.updateProduct(productId, product); }
  deleteProduct(productId: string): Promise<ApiResponse> { return this.business.deleteProduct(productId); }
}

export default WhatsApp;
