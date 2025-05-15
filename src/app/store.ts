import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import coordsReducer from "../features/coords/coordsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    coords: coordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
