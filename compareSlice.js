import { createSlice } from '@reduxjs/toolkit';

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    items: [],
  },
  reducers: {
    toggleCompare: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // If it is already in the compare list, remove it
        state.items.splice(existingIndex, 1);
      } else {
        // If it is not there, add it (but limit to 4 items maximum)
        if (state.items.length < 4) {
          state.items.push(action.payload);
        } else {
          alert("You can only compare up to 4 items at a time. Please remove one first.");
        }
      }
    }
  }
});

export const { toggleCompare } = compareSlice.actions;
export default compareSlice.reducer;