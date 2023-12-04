export interface MainItems {
  _id: string;
  ctgId: number;
  itemId: number;
  category: string;
  name: string;
  isAllview: boolean;
  isBest: boolean;
  isGiftSet: boolean;
  img: string;
  desc: string[] | string;
  price: number;
  capacity?: string;
  quantity: number;
}
