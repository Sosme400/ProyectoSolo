const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Para obtener credenciales desde .env

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sosme2004',
    database: 'tiendaMC2'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

// Rutas de Categorías
app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener categorías:', err);
            res.status(500).json({ error: 'Error al obtener categorías' });
            return;
        }
        res.status(200).json(results);
    });
});

// Añadir una nueva categoría
app.post('/categories', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
        return;
    }

    const query = 'INSERT INTO categories (name) VALUES (?)';
    db.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error al añadir categoría:', err);
            res.status(500).json({ error: 'Error al añadir categoría' });
            return;
        }
        res.status(201).json({ id: results.insertId, name });
    });
});

// Rutas de Productos
app.get('/products', (req, res) => {
    const query = 'SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos' });
            return;
        }
        const formattedResults = results.map(product => ({
            ...product,
            price: parseFloat(product.price),
        }));
        res.status(200).json(formattedResults);
    });
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        const product = results[0];
        product.price = parseFloat(product.price);
        res.status(200).json(product);
    });
});

// CRUD de productos (añadir, actualizar, eliminar)
app.post('/products', (req, res) => {
    const { name, description, price, quantity, category_id, image_url } = req.body;
    if (!name || !price || !quantity || !category_id) {
        res.status(400).json({ error: 'Faltan campos obligatorios' });
        return;
    }
    const query = 'INSERT INTO products (name, description, price, quantity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity, category_id, image_url], (err, results) => {
        if (err) {
            console.error('Error al registrar producto:', err);
            res.status(500).json({ error: 'Error al registrar producto', details: err.message });
            return;
        }
        res.status(201).json({ message: 'Producto registrado exitosamente', id: results.insertId });
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category_id, image_url } = req.body;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, image_url = ? WHERE id = ?';
    db.query(query, [name, description, price, quantity, category_id, image_url, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ error: 'Error al actualizar producto' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ error: 'Error al eliminar producto' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
