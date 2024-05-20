import { configureStore} from '@reduxjs/toolkit'
import libraryReducer from './slices/librarySlice'
import gameReducer from './slices/gameSlice'

export const store = configureStore({
    reducer: {
      libraryReducer,
      gameReducer
    },
    devTools: process.env.NODE_ENV !== "production",
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
