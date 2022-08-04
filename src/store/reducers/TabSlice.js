const { createSlice } = require("@reduxjs/toolkit");

const TabSlice = createSlice({
  name: "tab",
  initialState: { tabIndex: 0 },
  reducers: {
    changeTabIndex(state, action) {
      state.tabIndex = action.payload;
    },
  },
});

export const { changeTabIndex } = TabSlice.actions;
export default TabSlice.reducer;
