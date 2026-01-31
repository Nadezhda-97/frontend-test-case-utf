import { mockProducts } from "../mocks/products";

export const fetchProductsMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};
