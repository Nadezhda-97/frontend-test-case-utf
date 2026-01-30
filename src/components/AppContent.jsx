import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../store/store";

import { Header } from "./Header";
import { ProductList } from "./ProductList";
import { Cart } from "./Cart";

export function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const isLoading = !user;

  useEffect(() => {
    // имитация загрузки пользователя
    const timer = setTimeout(() => {
      dispatch(
        setUser({ 
          id: 1, 
          name: 'Иван Иванов', 
          email: 'ivan@example.com' 
        })
      );
    }, 500);

    return () => clearTimeout(timer); // чистим таймер при размонтировании
  }, [dispatch]);

  return (
    <div className="app">
      <Header user={user} isLoading={isLoading}/>
      <div className="main-content">
        <ProductList />
        <Cart />
      </div>
    </div>
  )
}