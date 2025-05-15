import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CoordsState {
  lat: number | null;
  lon: number | null;
}
const initialState: CoordsState = {
  lat: null,
  lon: null,
};
const coordsSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});
export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
