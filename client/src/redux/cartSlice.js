import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
          isSelected: true,
        });
        state.totalAmount += newItem.price;
        state.totalQuantity += 1;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;

        if (existingItem.isSelected) {
          state.totalAmount += newItem.price;
          state.totalQuantity += 1;
        }
      }
    },

    adjustItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    toggleItemSelection(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        existingItem.isSelected = !existingItem.isSelected;

        if (existingItem.isSelected) {
          state.totalAmount += existingItem.totalPrice;
          state.totalQuantity += existingItem.quantity;
        } else {
          state.totalAmount -= existingItem.totalPrice;
          state.totalQuantity -= existingItem.quantity;
        }
      }
    },

    removeItem(state, action) {
      const { itemId } = action.payload;
      const index = state.items.findIndex((item) => item.itemId === itemId);

      if (index >= 0) {
        const item = state.items[index];

        if (item.isSelected) {
          state.totalQuantity -= item.quantity;
        }

        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = {};
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItemToCart,
  adjustItemQuantity,
  toggleItemSelection,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const getTotalQuantity = (state) =>
  (state.items || []).reduce(
    (total, item) => total + (item.isSelected ? item.quantity : 0),
    0
  );

export const getTotalAmount = (state) =>
  state.items.reduce(
    (total, item) => total + (item.isSelected ? item.totalPrice : 0),
    0
  );

export default cartSlice.reducer;
