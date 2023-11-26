const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  // 몽고디비 banner
  BANNERS: `${BASE_URL}/categories/banner`,

  // 몽고디비 mainItems
  ITEMS: `${BASE_URL}/items`,
  ALL: `${BASE_URL}/items/all`,
  BEST: `${BASE_URL}/items/best`,
  GIFT: `${BASE_URL}/items/gift`,
  ITEMS_CTG: `${BASE_URL}/items/category`,

  // 몽고디비 banner
  CATEGORIES: `${BASE_URL}/categories`,

  // 몽고디비 itemsDetail
  ITEMS_DETAIL: `${BASE_URL}/detail`,
};
