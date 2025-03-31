import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getAvailableAssets, TAvailableAssetsResponse } from '../../services';
import { RootStore } from '../../types';
import { formaterCurrency, formaterPercent } from '../../utils';

const initialState = {
  data: [] as TAvailableAssetsResponse[],
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: '',
};

export const fetchAvailableAssets = createAsyncThunk(
  'availableAssets/fetchAvailableAssets',
  async () => await getAvailableAssets()
);

export const availableAssetsSlice = createSlice({
  name: 'availableAssets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailableAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAvailableAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

// экспорт редьюсера
export default availableAssetsSlice.reducer;

// экспорт селекторов
export const selectAvailableAssets = (state: RootStore) =>
  state.availableAssets;

// селектор с форматированными данными
export const selectAvailableAssetsFormattedData = createSelector(
  selectAvailableAssets,
  (assets) => ({
    ...assets,
    data: assets.data
      .filter((asset) => asset.symbol.endsWith('USDT'))
      .map((asset) => ({
        ...asset,
        lastPrice: formaterCurrency(parseFloat(asset.lastPrice)),
        priceChangePercent: formaterPercent(
          parseFloat(asset.priceChangePercent)
        ),
        baseAsset: asset.symbol.split('USDT')[0],
      })),
  })
);
