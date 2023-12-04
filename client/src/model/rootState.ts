import { CartItem } from "./cartItem";

export interface RootState {
  cart: {
    items: CartItem[];
  };
  auth: {
    loggedIn: boolean;
  };
}
