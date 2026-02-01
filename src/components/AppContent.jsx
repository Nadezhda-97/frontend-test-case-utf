import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, clearCart } from "../store/store";

import { Header } from "./Header";
import { ProductList } from "./ProductList";
import { Cart } from "./Cart";

export function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const isLoading = !user;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        setUser({ 
          id: 1, 
          name: 'Иван Иванов', 
          email: 'ivan@example.com' 
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleCheckout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Заказ оформлен!");
        dispatch(clearCart());
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="app">
      <Header user={user} isLoading={isLoading}/>
      <div className="main-content">
        <ProductList />
        <Cart onCheckout={handleCheckout} />
      </div>
    </div>
  )
}