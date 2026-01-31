import { useDispatch } from "react-redux";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: 'app/addToCart',
      payload: product,
    });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button onClick={handleAddToCart} >
        Добавить в корзину
      </button>
    </div>
  );
}
