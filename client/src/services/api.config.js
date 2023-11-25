const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  // 몽고디비 banner
  BANNERS: `${BASE_URL}/categories/banner`,
  // 몽고디비 mainItems
  BEST: `${BASE_URL}/items/best`,
  // 몽고디비 banner
  CATEGORIES: `${BASE_URL}/categories`,
  // 몽고디비 itemsDetail
  ITEMS_DETAIL: `${BASE_URL}/detail`,
};
