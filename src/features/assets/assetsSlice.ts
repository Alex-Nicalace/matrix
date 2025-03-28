import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore, TAsset } from '../../types';

const initialState: TAsset[] = [
  {
    id: 'b987ea65-277d-4ec7-9608-f81ddb47d743',
    name: 'ETH',
    symbol: 'ETHUSDT',
    quantity: 10,
    currentPrice: 1889.79,
    purchasePrice: 1925.41,
    change24h: -5.476,
    percentageOfPortfolio: 66.75639157504307,
  },
  {
    id: 'y987ea65-277d-4ec7-9608-f81ddb47d743',
    name: 'ETH',
    symbol: 'ETHUSDT',
    quantity: 10,
    currentPrice: 1889.79,
    purchasePrice: 1925.41,
    change24h: -5.476,
    percentageOfPortfolio: 66.75639157504307,
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
  },
});

// экспорт action creator
export const { addAsset, removeAsset } = assetsSlice.actions;

// экспорт редьюсера
export default assetsSlice.reducer;

// экспорт селекторов
export const selectAssets = (state: RootStore) => state.assets;
