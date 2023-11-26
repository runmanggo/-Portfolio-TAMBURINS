import axios from "axios";
import { API } from "./api.config";

// Search 컴포넌트
export const fetchProducts = async (query) => {
  try {
    const response = await axios.get(`${API.ITEMS}?query=${query}`);

    const filteredProducts = response.data.filter(
      (product) =>
        product.name.includes(query) ||
        (Array.isArray(product.desc) &&
          product.desc.some((desc) => desc.includes(query)))
    );

    return { products: filteredProducts, count: filteredProducts.length };
  } catch (error) {
    throw new Error(error.message);
  }
};
