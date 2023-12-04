export interface CartItem {
  itemId: number;
  price: number;
  quantity: number;
  totalPrice: number;
  // cartItems props 타입지정
  isSelected: boolean;
  capacityImg: string[] | string;
  capacity: string[] | string;
  name: string;
  uid: any;
}
