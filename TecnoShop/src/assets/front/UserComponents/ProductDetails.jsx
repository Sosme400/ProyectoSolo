import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Función para obtener el user_id desde localStorage
const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem("user_id");
  return userId; // Devuelve el user_id si está presente, de lo contrario null
};

const ProductDetails = () => {
  const { id } = useParams();  // Obtiene el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const PRODUCT_API_URL = `http://localhost:8000/products/${id}`;

  // Obtiene el user_id al cargar el componente
  const userId = getUserIdFromLocalStorage();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(PRODUCT_API_URL);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Usuario no autenticado. Inicia sesión para agregar al carrito.");
      return;
    }

    if (!product || !product.id) {
      alert("Producto inválido. No se puede agregar al carrito.");
      return;
    }

    try {
      // Hacer la petición POST para agregar el producto al carrito
      const response = await axios.post("http://localhost:8000/cart", {
        userId: userId,       // Pasamos el user_id
        productId: product.id, // ID del producto
        quantity: 1,           // Cantidad por defecto 1
      });

      alert(response.data.message);  // Muestra mensaje de éxito
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Hubo un error al agregar el producto al carrito");
      }
    }
  };

  if (loading) {
    return <div className="p-4">Cargando producto...</div>;
  }

  if (error || !product) {
    return <div className="p-4">No se encontró el producto.</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-md mb-4"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-2">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 mb-2"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
