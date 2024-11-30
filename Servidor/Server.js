const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

require('dotenv').config(); // Para credenciales en .env

const app = express();
const port = 8000;

// Middleware de CORS configurado primero
// Middleware de CORS configurado primero
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Ya no es necesario credentials: true
}));

app.use(express.json()); // Middleware para parsear JSON

// Configuración de la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sosme2004',
    database: 'tiendaMC2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Probar conexión a la base de datos
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conexión a la base de datos exitosa.');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

app.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE LOWER(correo) = ?',
            [correo.toLowerCase()]
        );

        if (usuarios.length === 0) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const usuario = usuarios[0];
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esValida) {
            return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            'tu_secreto_jwt',
            { expiresIn: '1h' }
        );

        // Enviar solo el token y los datos del usuario en la respuesta
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol,
            },
            token, // Mandamos el token directamente
        });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});


app.get('/protected', verificarToken, (req, res) => {
    // Ahora ya no hace falta verificar si el usuario está verificado, solo si el token es válido.
    res.json({ mensaje: "Acceso permitido", usuario: req.user }); // Enviar los datos del usuario
  });
  

// Rutas de Categorías
app.get('/categories', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM categories');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});

// Añadir una nueva categoría
app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }

    try {
        const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        console.error('Error al añadir categoría:', error);
        res.status(500).json({ error: 'Error al añadir categoría' });
    }
});

// Eliminar una categoría
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar categoría' });
    }
});

// Rutas de Productos
app.get('/products', async (req, res) => {
    try {
        const [results] = await db.query(
            'SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id'
        );
        const formattedResults = results.map(product => ({
            ...product,
            price: parseFloat(product.price),
            quantity: product.quantity, // Asegúrate de incluir 'quantity' en los resultados
        }));
        res.status(200).json(formattedResults);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query(
            'SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = ?',
            [id]
        );
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const product = results[0];
        product.price = parseFloat(product.price);
        product.quantity = product.quantity; // Asegúrate de incluir 'quantity' en el producto individual
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, quantity, category_id, image_url } = req.body;
    if (!name || !price || !quantity || !category_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO products (name, description, price, quantity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, quantity, category_id, image_url]
        );
        res.status(201).json({ message: 'Producto registrado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al registrar producto:', error);
        res.status(500).json({ error: 'Error al registrar producto' });
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category_id, image_url } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, image_url = ? WHERE id = ?',
            [name, description, price, quantity, category_id, image_url, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Ruta para obtener los productos del carrito de un usuario
app.get("/cart/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const [cartItems] = await db.query(
            'SELECT c.id, p.name, p.price, p.image_url, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [userId]
        );
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Ruta para agregar un producto al carrito
app.post("/cart", async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Verificar los datos recibidos
    console.log('Datos recibidos:', req.body);

    try {
        // Verificar si el producto existe
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const [existingCartItem] = await db.query(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (existingCartItem.length > 0) {
            // Si el producto ya existe en el carrito, actualiza la cantidad
            await db.query('UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
                [quantity, userId, productId]
            );
        } else {
            // Si el producto no está en el carrito, lo agrega
            await db.query(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
        }

        res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

// Ruta para eliminar un producto del carrito
app.delete('/cart', async (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'Faltan parámetros.' });
    }

    try {
        const result = await db.query(
            'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
            [user_id, product_id]
        );
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Producto eliminado del carrito.' });
        } else {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar producto del carrito.' });
    }
});


const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header

  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado." });
  }

  // Verificar el token
  jwt.verify(token, "tu_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: "Token inválido." });
    }

    // Agregar los datos del usuario decodificados al objeto de la solicitud
    req.user = decoded;  // Aquí ya tienes los datos del usuario (si el token es válido)
    next(); // Continuar con la siguiente función o ruta
  });
}

module.exports = verificarToken;



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
