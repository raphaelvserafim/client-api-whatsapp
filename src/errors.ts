export class WhatsAppError extends Error {
  readonly statusCode: number | undefined;
  readonly responseBody: unknown;

  constructor(message: string, statusCode?: number, responseBody?: unknown) {
    super(message);
    this.name = 'WhatsAppError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}
