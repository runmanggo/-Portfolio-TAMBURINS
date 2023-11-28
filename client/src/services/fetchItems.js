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

    const targetIndex = response.data.findIndex((item) => item.ctgId === 13);

    if (targetIndex !== -1) {
      response.data.splice(targetIndex, 1);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
