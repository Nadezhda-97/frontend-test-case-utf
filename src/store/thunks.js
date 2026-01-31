import { fetchProductsMock } from "../api/fetchProductsMock";
import { setProducts, setLoading, setError } from "./store";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const products = await fetchProductsMock();
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError('Ошибка загрузки товаров'));
  } finally {
    dispatch(setLoading(false));
  }
};
