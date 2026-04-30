type WebSocketMessageHandler = (data: unknown) => void;

type Options = {
  url: string;
  onMessage: WebSocketMessageHandler;
  maxRetries?: number;
};

export class AppWebSocketClient {
  private ws: WebSocket | null = null;
  private retryCount = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private manuallyClosed = false;

  constructor(private options: Options) {}

  connect() {
    this.manuallyClosed = false;
    this.ws = new WebSocket(this.options.url);

    this.ws.onopen = () => {
      this.retryCount = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        this.options.onMessage(payload);
      } catch {
        console.warn("Invalid WebSocket message", event.data);
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };

    this.ws.onclose = () => {
      if (!this.manuallyClosed) {
        this.scheduleReconnect();
      }
    };
  }

  disconnect() {
    this.manuallyClosed = true;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.ws?.close();
    this.ws = null;
  }

  private scheduleReconnect() {
    const maxRetries = this.options.maxRetries ?? 5;

    if (this.retryCount >= maxRetries) return;

    const delay = Math.min(1000 * 2 ** this.retryCount, 30000);

    this.reconnectTimer = setTimeout(() => {
      this.retryCount += 1;
      this.connect();
    }, delay);
  }
}