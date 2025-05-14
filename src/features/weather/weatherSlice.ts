// features/weather/weatherSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number };
}

interface WeatherState {
  data: WeatherData | null;
}

const initialState: WeatherState = {
  data: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherData>) => {
      state.data = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
