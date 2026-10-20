/**
 * Componente: ProductCard.jsx
 * Props: product { id, name, price, image, description, category }
 */
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Ecommerce.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">S/ {Number(product.price).toFixed(2)}</span>
          <button className="add-btn" onClick={() => addToCart(product)}>
            Agregar ➕
          </button>
        </div>

        <div className="stock-info">
          <small>Stock: {product.stock} unidades</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
