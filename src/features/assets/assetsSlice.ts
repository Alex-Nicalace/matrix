import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore, TAsset } from '../../types';
import {
  connectWebSocket,
  disconnectWebSocket,
  TWebSocketMessage,
} from '../../services';
import store from '../../store';

const initialState: TAsset[] = [
  {
    id: 'b987ea65-277d-4ec7-9608-f81ddb47d743',
    name: 'ETH',
    symbol: 'ETHUSDT',
    quantity: 10,
    currentPrice: 1889.79,
    purchasePrice: 1925.41,
    change24h: -5.476,
    percentageOfPortfolio: 66.75,
  },
  {
    id: 'y987ea65-277d-4ec7-9608-f81ddb47d743',
    name: 'BNB',
    symbol: 'BNBUSDT',
    quantity: 10,
    currentPrice: 1889.79,
    purchasePrice: 1925.41,
    change24h: -5.476,
    percentageOfPortfolio: 66.75,
  },
];

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<TAsset>) => {
      state.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      return state.filter((asset) => asset.id !== action.payload);
    },
    updateAssetPrice: (state, action: PayloadAction<TWebSocketMessage>) => {
      const asset = state.find((a) => a.symbol === action.payload.symbol);
      if (asset) {
        asset.currentPrice = action.payload.currentPrice;
        asset.change24h = action.payload.change24h;
        asset.purchasePrice = asset.currentPrice * asset.quantity;
        asset.name = action.payload.name;
        const totalCost = state.reduce((acc, a) => acc + a.purchasePrice, 0);
        state.forEach((a) => {
          a.percentageOfPortfolio = (a.purchasePrice / totalCost) * 100;
        });
      }
    },
    startWebSocket: (_, action: PayloadAction<string[]>) => {
      connectWebSocket(action.payload, (data) => {
        store.dispatch(assetsSlice.actions.updateAssetPrice(data));
      });
    },
    stopWebSocket: () => {
      disconnectWebSocket();
    },
  },
});

// экспорт action creator
export const { addAsset, removeAsset, startWebSocket, stopWebSocket } =
  assetsSlice.actions;

// экспорт редьюсера
export default assetsSlice.reducer;

// экспорт селекторов
export const selectAssets = (state: RootStore) => state.assets;
