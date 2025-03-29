import { TWebSocketMessage, TWebSocketResponse } from './services.types';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/stream';

let socket: WebSocket | null = null;

/**
 * Открывает WebSocket-соединение и подписывается на активы.
 * @param symbols Список символов активов (например, ["btcusdt", "ethusdt"])
 * @param onMessage Колбэк для обработки входящих данных
 */
export const connectWebSocket = (
  symbols: string[],
  onMessage: (data: TWebSocketMessage) => void
) => {
  if (socket) return; // Избегаем повторных подключений

  const streams = symbols.map((symbol) => `${symbol}@ticker`).join('/');
  socket = new WebSocket(`${BINANCE_WS_URL}?streams=${streams}`);

  socket.onopen = () => console.log('WebSocket подключен');
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (!response.data) return;
    const {
      s: symbol,
      c: currentPrice,
      P: change24h,
    } = response.data as TWebSocketResponse;
    onMessage({
      symbol,
      currentPrice: parseFloat(currentPrice),
      change24h: parseFloat(change24h),
      name: symbol.split('USDT')[0],
    });
  };

  socket.onerror = (error) => console.error('WebSocket ошибка:', error);
  socket.onclose = () => {
    console.log('WebSocket отключен');
    socket = null;
  };
};

/**
 * Закрывает WebSocket-соединение.
 */
export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
