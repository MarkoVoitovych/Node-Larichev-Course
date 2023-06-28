export class HTTPError {
  context?: string;

  constructor(
    public statusCode: number,
    public message: string,
    context?: string
  ) {
    // super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}
