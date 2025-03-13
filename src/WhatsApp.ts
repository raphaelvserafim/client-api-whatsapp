import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Init, HttpMethod, WebhookBody, Routes, TypeMessage, StatusPresence, Contact, Section, InfoInstance, SendMessageRoot } from './model';

export class WhatsApp {
  private readonly server: string;
  private readonly key: string;
  private route: string;
  private method: HttpMethod | null = null;
  private body: any = null;

  constructor(data: Init) {
    this.server = data.server;
    this.key = data.key;
  }

  private async request(): Promise<any> {
    if (!this.route || !this.method) {
      throw new Error('Path and method must be defined before making a request.');
    }
    const options: AxiosRequestConfig = {
      url: `${this.server}/${this.key}/${this.route}`,
      method: this.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if ((this.method === 'POST' || this.method === 'PUT') && this.body) {
      options.data = JSON.stringify(this.body);
    }
    try {
      const response = await axios(options);
      return response.data;
    } catch (error: any) {
      throw new Error(`HTTP Request Error: ${error.message} (status: ${error.response?.status})`);
    }
  }


  async connect(): Promise<any> {
    this.route = Routes.INSTANCES;
    this.method = HttpMethod.POST;
    return await this.request();
  }

  async info(): Promise<InfoInstance> {
    this.route = Routes.INSTANCES;
    this.method = HttpMethod.GET;
    return await this.request();
  }

  async logout(): Promise<any> {
    this.route = Routes.INSTANCES;
    this.method = HttpMethod.DELETE;
    return await this.request();
  }


  async setting(markMessageRead: boolean, saveMedia: boolean, receiveStatusMessage: boolean): Promise<any> {
    this.route = Routes.INSTANCES + `/?markMessageRead=${markMessageRead}&saveMedia=${saveMedia}&receiveStatusMessage=${receiveStatusMessage}`;
    this.method = HttpMethod.PATCH;
    return await this.request();
  }


  async updateWebhook(body: WebhookBody): Promise<any> {
    this.route = Routes.INSTANCES;
    this.method = HttpMethod.PUT;
    this.body = body;
    return await this.request();
  }


  async sendMessage(
    data: {
      type: TypeMessage,
      body: {
        to: string,
        msgId?: string,
        status?: StatusPresence,
        text?: string,
        url?: string,
        caption?: string,
        mimetype?: string,
        fileName?: string,
        contact?: Contact,
        location?: Location,
        name?: string,
        options?: string[],
        sections?: Section,
        footer?: string,
        description?: string,
        title?: string,
        buttonText?: string,
        thumbnailUrl?: string,
        sourceUrl?: string,
      }
    }, reply: boolean = false): Promise<SendMessageRoot> {
    if (reply) {
      this.route = Routes.MESSAGES + "/" + data.body.msgId + "/" + data.type;
    } else {
      this.route = Routes.MESSAGES + "/" + data.type;
    }

    this.method = HttpMethod.POST;
    this.body = data.body;
    return await this.request();
  }


  async forwardingMessage(to: string, msgId: string) {
    this.route = Routes.MESSAGES + "/" + msgId + "/forwarding";
    this.method = HttpMethod.POST;
    this.body = {
      to,
    }
    return await this.request();
  }

  async rejectCall(id: string, from: string) {
    this.route = Routes.CALL + `/${id}/${from}`;
    this.method = HttpMethod.DELETE;
    return await this.request();
  }

  async pairingCode(phoneNumber: string) {
    this.route = Routes.INSTANCES + "/pairing-code";
    this.body = {
      phoneNumber,
    }
    this.method = HttpMethod.POST;
    return await this.request();
  }

  async checkRegisteredWhatsapp(number: string) {
    this.route = Routes.ACTIONS + "/registered?number=" + number;
    this.method = HttpMethod.GET;
    return await this.request();
  }


  async contacts() {
    this.route = Routes.CONTACTS;
    this.method = HttpMethod.GET;
    return await this.request();
  }

  async contactProfile(id: string) {
    this.route = Routes.CONTACTS + "/" + id;
    this.method = HttpMethod.GET;
    return await this.request();
  }


  async groups() {
    this.route = Routes.GROUPS;
    this.method = HttpMethod.GET;
    return await this.request();
  }


  async infoGroup(id: string) {
    this.route = Routes.GROUPS + "/" + id;
    this.method = HttpMethod.GET;
    return await this.request();
  }

  async getInviteGroup(id: string) {
    this.route = Routes.GROUPS + "/" + id + "/invite";
    this.method = HttpMethod.GET;
    return await this.request();
  }



  async updateGroup(id: string, name: string, description: string) {
    this.route = Routes.GROUPS + "/" + id;
    this.method = HttpMethod.PUT;
    this.body = {
      name,
      description
    }
    return await this.request();
  }

  async updateGroupPicture(id: string, url: string) {
    this.route = Routes.GROUPS + "/" + id + "/picture";
    this.method = HttpMethod.PUT;
    this.body = {
      url
    }
    return await this.request();
  }

  async leaveGroup(id: string) {
    this.route = Routes.GROUPS + "/" + id;
    this.method = HttpMethod.DELETE;
    return await this.request();
  }

  async createGroup(name: string, participants: string[]) {
    this.route = Routes.GROUPS;
    this.method = HttpMethod.POST;
    this.body = {
      name,
      participants
    }
    return await this.request();
  }


  async addParticipantsGroup(id: string, participants: string[]) {
    this.route = Routes.GROUPS + "/" + id + "/participants";
    this.method = HttpMethod.POST;
    this.body = {
      participants
    }
    return await this.request();
  }

}


export default WhatsApp;


