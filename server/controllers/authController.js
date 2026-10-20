const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto-super-seguro-cambiar-en-produccion';
const JWT_EXPIRES = '7d';

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email y password son obligatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const user = await User.create({ username, email, password });
    const token = signToken(user);

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      user,
      token
    });
  } catch (err) {
    if (err.message.includes('ya está registrado')) {
      return res.status(409).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email y password son obligatorios' });
    }

    const user = await User.validatePassword(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = signToken(user);
    res.json({
      mensaje: 'Login exitoso',
      user,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = User.findById(payload.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch (e) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
