import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function UserCompra() {
  const location = useLocation();
  const { storeName } = location.state || {}; // Recibe el nombre de la tienda desde UserPage
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulación de llamada a una API para obtener productos específicos de la tienda
    // Reemplaza este fetch con una llamada real a tu API
    fetch(`/api/stores/${storeName}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al obtener los productos:", error));
  }, [storeName]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Tienda: {storeName}</h1>

          <div className="mb-4">
            <img 
              src="https://via.placeholder.com/600x200" 
              alt="Imagen de la Tienda" 
              className="w-3/4 h-auto object-cover mx-auto rounded-lg" 
            />
          </div>

          <p className="text-lg text-center mb-8">
            Bienvenido a {storeName}, donde encontrarás productos de calidad y variados.
          </p>

          <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-2">
                  <img 
                    src={product.image || "https://via.placeholder.com/100"} 
                    alt={product.name} 
                    className="w-full h-32 object-cover mb-2 rounded-lg"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500 mb-2">{product.description || 'Descripción del producto'}</p>
                  <p className="text-lg font-bold">{product.price}</p>
                  <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1">
                    Agregar al Carrito
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No hay productos disponibles en esta tienda.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}