/**
 * ============================================================
 *  Modelo: Product.js
 *  Campos requeridos según clase:
 *  - name, price, image, description
 * ============================================================
 *  Este modelo es agnóstico:
 *  - Ahora funciona con archivo JSON / memoria (para no depender de Mongo)
 *  - Migrar a Mongoose es cambiar solo este archivo (ver comentario abajo)
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/products.json');

// Asegurar que existe el archivo
function ensureDataFile() {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify(productosIniciales, null, 2));
  }
}

// Datos semilla (8 productos demo)
const productosIniciales = [
  {
    id: "1",
    name: "Audífonos Bluetooth Pro",
    price: 199.90,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Audífonos inalámbricos con cancelación de ruido activa y 30h de batería.",
    category: "Audio",
    stock: 25
  },
  {
    id: "2",
    name: "Smartwatch Deportivo X2",
    price: 349.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Reloj inteligente resistente al agua, GPS y monitoreo cardíaco.",
    category: "Wearables",
    stock: 18
  },
  {
    id: "3",
    name: "Teclado Mecánico RGB",
    price: 279.50,
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=400",
    description: "Switches blue, iluminación RGB personalizable, ideal para gaming.",
    category: "Computo",
    stock: 12
  },
  {
    id: "4",
    name: "Mochila Urbana Impermeable",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    description: "Mochila con compartimento laptop 15.6 y puerto USB integrado.",
    category: "Accesorios",
    stock: 30
  },
  {
    id: "5",
    name: "Cámara Instantánea Retro",
    price: 459.00,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    description: "Cámara instantánea con fotos reveladas en 10 segundos.",
    category: "Foto",
    stock: 8
  },
  {
    id: "6",
    name: "Zapatillas Urban Running",
    price: 299.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description: "Zapatillas livianas con amortiguación Air y diseño urbano.",
    category: "Calzado",
    stock: 20
  },
  {
    id: "7",
    name: "Lámpara LED de Escritorio",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    description: "Lámpara táctil regulable, 3 temperaturas de color, puerto USB.",
    category: "Hogar",
    stock: 40
  },
  {
    id: "8",
    name: "Mouse Inalámbrico Ergonómico",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    description: "Mouse 2.4GHz silencioso, batería 12 meses, diseño ergonómico.",
    category: "Computo",
    stock: 35
  }
];

class ProductModel {
  static getAll() {
    ensureDataFile();
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
  }

  static getById(id) {
    return this.getAll().find(p => p.id === id);
  }

  static create({ name, price, image, description, category, stock }) {
    // Validación básica
    if (!name || price == null || !image || !description) {
      throw new Error('Faltan campos obligatorios: name, price, image, description');
    }
    const productos = this.getAll();
    const nuevo = {
      id: uuidv4(),
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
      description: description.trim(),
      category: category || 'General',
      stock: stock != null ? Number(stock) : 10,
      createdAt: new Date().toISOString()
    };
    productos.push(nuevo);
    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2));
    return nuevo;
  }

  static update(id, updates) {
    const productos = this.getAll();
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    productos[idx] = { ...productos[idx], ...updates, id }; // no cambiar id
    if (updates.price != null) productos[idx].price = Number(updates.price);
    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2));
    return productos[idx];
  }

  static delete(id) {
    const productos = this.getAll();
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    productos.splice(idx, 1);
    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2));
    return true;
  }
}

/*
  🔄 MIGRACIÓN A MONGODB/MONGOOSE (cuando quieras):
  Reemplaza este archivo por:
  
  const mongoose = require('mongoose');
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    stock: Number
  }, { timestamps: true });
  module.exports = mongoose.model('Product', productSchema);
*/

module.exports = ProductModel;
