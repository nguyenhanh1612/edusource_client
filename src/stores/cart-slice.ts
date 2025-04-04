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
    addItemsToCart: (state, action: PayloadAction<{ productIds: string[] }>) => {
      console.log("Khôi phục sản phẩm vào giỏ hàng:", action.payload.productIds); // Debug 🛠
      action.payload.productIds.forEach((productId) => {
        const existingItem = state.items.find((item) => item.productId === productId);
        if (!existingItem) {
          state.items.push({ productId, quantity: 1 }); // Thêm sản phẩm với quantity = 1
          state.totalItems += 1;
        }
      });
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
    removePaidItems: (state, action: PayloadAction<{ productIds?: string[] }>) => {
      if (!action.payload.productIds || action.payload.productIds.length === 0) {
        return; // Nếu danh sách rỗng hoặc undefined, không làm gì cả
      }
      console.log("Trước khi xóa:", state.items); // 🛠 Debug
      state.items = state.items.filter(
        (item) => !action.payload.productIds?.includes(item.productId) // 🛠 Sử dụng ?. để tránh lỗi
      );
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    resetCart: (state) => {
      console.log("resetCart() đã được gọi!"); // 🛠 Debug
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
  removePaidItems,
  updateQuantity,
  resetCart,
  setCart,
  addItemsToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
