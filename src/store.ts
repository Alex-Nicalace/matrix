import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './features/assets/assetsSlice';
import availableAssetsReducer from './features/availableAssets/availableAssetsSlice';

const store = configureStore({
  reducer: {
    assets: assetsReducer,
    availableAssets: availableAssetsReducer,
  },
});

export default store;
