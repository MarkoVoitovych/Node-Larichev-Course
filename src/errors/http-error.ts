export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public context?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}
