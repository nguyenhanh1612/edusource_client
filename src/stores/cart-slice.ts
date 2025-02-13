import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (!action.payload.productId) {
        console.error("productId is undefined");
        return;
      }
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalItems += action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.totalItems -= state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        state.totalItems += action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  resetCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
