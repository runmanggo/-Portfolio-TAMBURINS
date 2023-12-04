import axios from "axios";
import { API } from "./api.config";
import { MainItems } from "model/mainItems";

// Search 컴포넌트
export const fetchProducts = async (
  query: string
): Promise<{ products: MainItems[]; count: number }> => {
  try {
    const response = await axios.get<MainItems[]>(
      `${API.ITEMS}?query=${query}`
    );
    const filteredProducts = response.data.filter(
      (product) =>
        product.name.includes(query) ||
        (Array.isArray(product.desc) &&
          product.desc.some((desc) => desc.includes(query)))
    );

    return { products: filteredProducts, count: filteredProducts.length };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
