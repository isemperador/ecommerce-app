const Product = require('../models/Product');

exports.getAll = (req, res) => {
  let productos = Product.getAll();

  // Filtro opcional ?search=texto
  const { search } = req.query;
  if (search) {
    const q = search.toLowerCase();
    productos = productos.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  res.json(productos);
};

exports.getById = (req, res) => {
  const prod = Product.getById(req.params.id);
  if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(prod);
};

exports.create = (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;
    const nuevo = Product.create({ name, price, image, description, category, stock });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = (req, res) => {
  const actualizado = Product.update(req.params.id, req.body);
  if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(actualizado);
};

exports.delete = (req, res) => {
  const ok = Product.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ mensaje: 'Producto eliminado correctamente' });
};
