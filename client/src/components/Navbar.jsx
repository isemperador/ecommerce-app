/**
 * Componente: Navbar.jsx
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Ecommerce.css';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🛒 ShopPerú</Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/cart">Carrito</Link>
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-badge">
          🛍️ Carrito <span className="badge">{totalItems}</span>
        </Link>

        {user ? (
          <div className="user-section">
            <span className="user-name">Hola, {user.username}</span>
            <button className="logout-btn-sm" onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
