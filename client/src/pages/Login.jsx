/**
 * Página: Login.jsx + Register
 * Auth simple con JWT
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Ecommerce.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });
    try {
      let res;
      if (isRegister) {
        res = await authAPI.register(form);
      } else {
        res = await authAPI.login({ email: form.email, password: form.password });
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMsg({ type: 'success', text: res.data.mensaje + ' Redirigiendo...' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'} 🔐</h1>
        <p className="auth-subtitle">
          {isRegister ? 'Regístrate para comprar' : 'Ingresa a tu cuenta'}
        </p>

        {msg.text && (
          <div className={`msg ${msg.type}`}>{msg.text}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <input
              type="text" name="username" placeholder="Nombre de usuario"
              value={form.username} onChange={handleChange} required
              className="auth-input"
            />
          )}
          <input
            type="email" name="email" placeholder="Correo electrónico"
            value={form.email} onChange={handleChange} required
            className="auth-input"
          />
          <input
            type="password" name="password" placeholder="Contraseña (mín. 6 caracteres)"
            value={form.password} onChange={handleChange} required minLength={6}
            className="auth-input"
          />
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Ingresar')}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button className="link-btn" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? ' Inicia sesión' : ' Regístrate'}
          </button>
        </p>

        <div className="auth-hint">
          <small>💡 Tip: Puedes probar sin registrarte, pero la auth es parte de la evaluación.</small>
          <br /><small>Backend: POST /api/auth/register y POST /api/auth/login</small>
        </div>

        <Link to="/" className="back-link">← Volver a la tienda</Link>
      </div>
    </div>
  );
};

export default Login;
