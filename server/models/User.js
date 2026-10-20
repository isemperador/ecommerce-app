/**
 * Modelo: User.js
 * Para Auth: login / register
 * Campos: username, email, password (hasheada)
 * 
 * Igual que Product, usa archivo JSON para no depender de MongoDB.
 * Migrar a Mongoose es trivial.
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/users.json');

function ensureFile() {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
}

class UserModel {
  static getAll() {
    ensureFile();
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  static findByEmail(email) {
    return this.getAll().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static findById(id) {
    return this.getAll().find(u => u.id === id);
  }

  static async create({ username, email, password }) {
    if (!username || !email || !password) throw new Error('Faltan campos');
    if (this.findByEmail(email)) throw new Error('El email ya está registrado');

    const usuarios = this.getAll();
    const hashed = await bcrypt.hash(password, 10);

    const nuevo = {
      id: uuidv4(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      createdAt: new Date().toISOString()
    };
    usuarios.push(nuevo);
    fs.writeFileSync(dataPath, JSON.stringify(usuarios, null, 2));

    // No devolver password
    const { password: _, ...safeUser } = nuevo;
    return safeUser;
  }

  static async validatePassword(email, plainPassword) {
    const user = this.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(plainPassword, user.password);
    if (!ok) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = UserModel;
