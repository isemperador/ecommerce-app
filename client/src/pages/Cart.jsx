/**
 * Página: Cart.jsx
 * Muestra carrito, permite eliminar y simular compra
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Ecommerce.css';

const Cart = () => {
  const { items, addToCart, removeFromCart, removeCompletely, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Agrega productos desde la tienda.</p>
        <Link to="/" className="btn-primary">Ir a la tienda</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    alert(`¡Compra exitosa! 🎉\nTotal pagado: S/ ${totalPrice.toFixed(2)}\nGracias por tu compra.`);
    clearCart();
  };

  return (
    <div className="cart-container">
      <h1>🛍️ Tu Carrito ({totalItems} items)</h1>

      <div className="cart-layout-e">
        <div className="cart-items">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-item-img" />

              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p className="cart-item-price">S/ {product.price.toFixed(2)} c/u</p>
                <p className="cart-item-desc">{product.description.slice(0, 80)}...</p>
              </div>

              <div className="cart-item-controls">
                <div className="qty-controls">
                  <button onClick={() => removeFromCart(product.id)} className="qty-btn">−</button>
                  <span className="qty-number">{qty}</span>
                  <button onClick={() => addToCart(product)} className="qty-btn">+</button>
                </div>
                <div className="item-subtotal">S/ {(product.price * qty).toFixed(2)}</div>
                <button onClick={() => removeCompletely(product.id)} className="remove-btn">Eliminar 🗑️</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>S/ {totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free">Gratis</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Total</span>
            <span>S/ {totalPrice.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>Pagar ahora 💳</button>
          <button className="btn-clear" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/" className="continue-link">← Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
