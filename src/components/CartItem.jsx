export function CartItem({ item, onRemove, onChangeQuantity }) {
  const { id, image, name, price, quantity } = item;

  const handleDecrease = () => {
    onChangeQuantity(id, quantity - 1);
  };

  const handleIncrease = () => {
    onChangeQuantity(id, quantity + 1);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="cart-item">
      <img src={image} alt={name} />
      <div className="item-details">
        <h4>{name}</h4>
        <p>${price}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
      <button className="remove-btn" onClick={handleRemove}>
        Удалить
      </button>
    </div>
  );
}