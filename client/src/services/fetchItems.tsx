import axios from "axios";
import { API } from "./api.config";
import { MainItems } from "model/mainItems";

// Category 컴포넌트에 삽입
export const fetchItems = async (category: string): Promise<MainItems[]> => {
  try {
    let response;

    if (category === "bestSellers") {
      response = await axios.get<MainItems[]>(API.BEST);
    } else if (category === "giftSet") {
      response = await axios.get<MainItems[]>(API.GIFT);
    } else {
      response = await axios.get<MainItems[]>(API.ITEMS_CTG, {
        params: {
          category: category,
        },
      });
    }

    const targetIndex = response.data.findIndex((item) => item.ctgId === 13);

    if (targetIndex !== -1) {
      response.data.splice(targetIndex, 1);
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
