import store from '../store';

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TAsset = {
  name: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  change24h: number;
  percentageOfPortfolio: number;
};
