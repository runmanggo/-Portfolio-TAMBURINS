import axios from "axios";
import { API } from "./api.config";
import { ItemsDetail } from "../model/itemsDetail";

//SliderItems 컴포넌트
export const fetchDetail = async (id: number): Promise<number | undefined> => {
  try {
    const response = await axios.get<ItemsDetail[]>(API.ITEMS_DETAIL);
    const details = response.data;

    const matchedDetail = details.find(
      (detail) => detail.itemId === Number(id)
    );

    return matchedDetail ? matchedDetail.itemId : undefined;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

// ItemDetails 컴포넌트
export const fetchDetailId = async (
  id: number
): Promise<number | undefined> => {
  try {
    const response = await axios.get<ItemsDetail[]>(
      `${API.ITEMS_DETAIL}/${id}`
    );
    const details = response.data;

    const matchedId = details.find((detail) => detail.itemId === Number(id));

    return matchedId ? matchedId.itemId : undefined;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
