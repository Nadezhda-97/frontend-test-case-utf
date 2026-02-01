import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { selectCart, selectCartCount, selectTotalPrice } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/store';

import { CartItem } from './CartItem';

export function Cart({ onCheckout }) {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const cartCount = useSelector(selectCartCount);
  const totalPrice = useSelector(selectTotalPrice);

  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = async () => {
    if (!onCheckout) return;

    setShowCheckout(true);
    try {
      await onCheckout();
    } finally {
      setShowCheckout(false);
      setIsOpen(false);
    }
};

  return (
    <div className="cart">
      <button 
        className="cart-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onChangeQuantity={handleUpdateQuantity}
                />
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0 || showCheckout}
            >
              {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}