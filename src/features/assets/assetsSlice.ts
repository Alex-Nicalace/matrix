import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore, TAsset } from '../../types';
import {
  connectWebSocket,
  disconnectWebSocket,
  TWebSocketMessage,
} from '../../services';
import store from '../../store';

const STORAGE_KEY = 'assets';

function saveToStorage(assets: TAsset[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
}

function loadFromStorage(): TAsset[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

const initialState: TAsset[] = loadFromStorage();

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<TAsset>) => {
      state.push(action.payload);
      saveToStorage(state);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const newState = state.filter((asset) => asset.symbol !== action.payload);
      saveToStorage(newState);
      return newState;
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
    startWebSocket: (state) => {
      disconnectWebSocket();
      const symbols = state.map((a) => a.symbol);
      connectWebSocket(symbols, (data) => {
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
