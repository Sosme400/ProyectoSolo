import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const PRODUCT_API_URL = `http://localhost:8000/products/${id}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(PRODUCT_API_URL);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-4">Cargando producto...</div>;
  }

  if (error || !product) {
    return <div className="p-4">No se encontró el producto.</div>;
  }

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex items-center mb-2">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product.image_url} alt={product.name} className="w-full h-96 object-contain rounded-lg shadow-md mb-4" />
          <div className="flex space-x-2">
            {[product.image_url, product.image_url, product.image_url].map((img, index) => (
              <img key={index} src={img} alt={`Thumbnail ${index}`} className="w-20 h-20 object-contain border rounded-md cursor-pointer" />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {renderRating(product.rating || 4.5)}
          <div className="text-3xl font-bold text-green-600 mb-2">${product.price.toFixed(2)}</div>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500"><strong>Stock disponible:</strong> {product.quantity} unidades</p>
          <p className="mt-2 text-sm text-gray-500"><strong>Tienda:</strong> {product.store || "Tienda Default"}</p>

          <button className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 mb-2">
            Agregar al carrito
          </button>
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
