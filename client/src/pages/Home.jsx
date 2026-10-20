/**
 * Página: Home.jsx
 * Lista de productos con búsqueda
 */
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import '../styles/Ecommerce.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const res = await productAPI.getAll(query);
      setProductos(res.data);
      setError('');
    } catch (err) {
      setError('No se pudo cargar productos. ¿El servidor está encendido? (puerto 5001)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Bienvenido a ShopPerú 🛒</h1>
        <p>Los mejores productos al mejor precio. ¡Envío a todo el Perú!</p>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos... (ej: audífonos, zapatillas)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar 🔍</button>
        {search && (
          <button type="button" className="clear-btn" onClick={() => { setSearch(''); fetchProducts(); }}>
            Limpiar
          </button>
        )}
      </form>

      {loading && <p className="loading">Cargando productos...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        <>
          <p className="results-count">{productos.length} productos encontrados</p>
          <div className="products-grid">
            {productos.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {productos.length === 0 && <p className="no-results">No hay productos que coincidan con tu búsqueda.</p>}
        </>
      )}
    </div>
  );
};

export default Home;
