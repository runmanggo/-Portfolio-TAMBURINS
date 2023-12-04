export interface ItemsDetail {
  _id: string;
  ctgId: number;
  itemId: number;
  category: string;
  title: string;
  name: string;
  mainImg: string[] | string;
  mainVideo: string;
  price: number;
  capacityImg: string[] | string;
  capacityLink?: string[];
  capacity: string[] | string;
  itemKeyWord: string[] | string;
  infoSummary: Array<string[] | string> | string;
  detailBtn: string;
  detailBtnDesc: Array<string[] | string> | string;
  accordion1: Array<string[] | string> | string;
  accordion3: Array<string[] | string> | string;
}
