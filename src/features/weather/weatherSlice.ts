import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  data: any | null;
}

const initialState: WeatherState = {
  data: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
