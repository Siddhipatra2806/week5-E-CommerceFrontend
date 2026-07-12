import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import compareReducer from './compareSlice'; // 1. Import new slice

const loadState = () => {
  try {
    const savedState = localStorage.getItem('myStoreState');
    if (savedState === null) return undefined; 
    return JSON.parse(savedState);
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateToSave = JSON.stringify(state);
    localStorage.setItem('myStoreState', stateToSave);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer, // 2. Add to store
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    wishlist: store.getState().wishlist,
    compare: store.getState().compare // 3. Save to localStorage
  });
});