import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './features/assets/assetsSlice';

const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
});

export default store;
