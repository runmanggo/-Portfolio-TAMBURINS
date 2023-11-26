import axios from "axios";
import { API } from "./api.config";

// Category 컴포넌트에 삽입
export const fetchItems = async (category) => {
  try {
    let response;

    if (category === "bestSellers") {
      response = await axios.get(API.BEST);
    } else if (category === "giftSet") {
      response = await axios.get(API.GIFT);
    } else {
      response = await axios.get(API.ITEMS_CTG, {
        params: {
          category: category,
        },
      });
    }

    let isItemRemoved = false;

    const filteredItems = response.data.filter((item) => {
      if (isItemRemoved || item.ctgId !== 13 || item.itemId !== 307) {
        return true;
      }

      isItemRemoved = true;
      return false;
    });

    return filteredItems;
  } catch (error) {
    throw new Error(error.message);
  }
};
