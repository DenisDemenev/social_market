import axios from "../axios";

const catchError = (err) => {
  if (err.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    window.location.reload();
  }
  return Promise.reject(`Ошибка: ${err}`);
};

export const getGroupsVk = async ({
  pageCurrent = 1,
  limit = 50,
  categoryValue,
  searchValue,
  sortValue,
  isLabel,
  isFavorite,
  isShoppingCart,
  priceMin,
  priceMax,
}) => {
  try {
    const { data } = await axios.get(
      `/groups-vk/?page=${pageCurrent}&limit=${limit}${
        categoryValue ? `&category=${categoryValue}` : ""
      }${isLabel ? `&label=true` : ""}${
        isFavorite ? `&is_favorited=true` : ""
      }${isShoppingCart ? `&is_in_shopping_cart=true` : ""}${
        searchValue ? `&search=${searchValue}` : ""
      }${sortValue ? `&ordering=${sortValue}` : ""}${
        priceMin ? `&price_min=${priceMin}` : ""
      }${priceMax ? `&price_max=${priceMax}` : ""}`,
    );
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const getCategory = async () => {
  try {
    const { data } = await axios.get(`/category/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const addToCart = async ({ id }) => {
  try {
    const { data } = await axios.post(`/groups-vk/${id}/shopping_cart/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const removeFromCart = async ({ id }) => {
  try {
    const { data } = await axios.delete(`/groups-vk/${id}/shopping_cart/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const orderCart = async () => {
  try {
    const { data } = await axios.get(`/groups-vk/order_shopping_cart/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const addToFavorites = async ({ id }) => {
  try {
    const { data } = await axios.post(`/groups-vk/${id}/favorite/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const removeFromFavorites = async ({ id }) => {
  try {
    const { data } = await axios.delete(`/groups-vk/${id}/favorite/`);
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`/auth/token/login/`, {
      email,
      password,
    });
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const authVk = async () => {
  try {
    const { data } = await axios.get(
      `/auth/o/vk-oauth2/?redirect_uri=https://smax.store/auth`,
    );
    return data;
  } catch (err) {
    catchError(err);
  }
};

export const loginVk = async (location) => {
  try {
    const { data } = await axios.post(`/auth/o/vk-oauth2/${location}`);
    return data;
  } catch (err) {
    catchError(err);
  }
};
