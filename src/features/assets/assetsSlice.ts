import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootStore, TAsset } from '../../types';
import {
  connectWebSocket,
  disconnectWebSocket,
  TWebSocketMessage,
} from '../../services';
import store from '../../store';
import { formaterCurrency, formaterPercent } from '../../utils';

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
    addAsset: (
      state,
      action: PayloadAction<Pick<TAsset, 'symbol' | 'quantity' | 'name'>>
    ) => {
      const asset = state.find((a) => a.symbol === action.payload.symbol);
      if (!asset) {
        state.push({
          ...action.payload,
          currentPrice: 0,
          change24h: 0,
          percentageOfPortfolio: 0,
          purchasePrice: 0,
        });
      } else {
        asset.quantity += action.payload.quantity;
      }
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
      saveToStorage(state);
    },
    startWebSocket: (state) => {
      disconnectWebSocket();
      const symbols = state.map((a) => a.symbol);
      if (symbols.length === 0) return;
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
// селектор с форматированными данными
export const selectAssetsFormattedData = createSelector(
  selectAssets,
  (assets) => {
    return assets.map((asset) => ({
      ...asset,
      currentPrice: formaterCurrency(asset.currentPrice),
      purchasePrice: formaterCurrency(asset.purchasePrice),
      change24h: formaterPercent(asset.change24h),
      percentageOfPortfolio: formaterPercent(asset.percentageOfPortfolio),
    }));
  }
);

export const addAssetWithWebSocket = createAsyncThunk(
  'assets/addAssetWithWebSocket',
  async (asset: Pick<TAsset, 'symbol' | 'quantity' | 'name'>, { dispatch }) => {
    dispatch(stopWebSocket());
    dispatch(addAsset(asset));
    dispatch(startWebSocket());
  }
);

export const removeAssetWithWebSocket = createAsyncThunk(
  'assets/addAssetWithWebSocket',
  async (id: string, { dispatch }) => {
    dispatch(stopWebSocket());
    dispatch(removeAsset(id));
    dispatch(startWebSocket());
  }
);
