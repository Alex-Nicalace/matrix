export type TWebSocketMessage = {
  symbol: string;
  currentPrice: number;
  change24h: number;
  name: string;
};
export type TWebSocketResponse = {
  s: string;
  c: string;
  P: string;
};
