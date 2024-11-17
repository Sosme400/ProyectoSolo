import React, { useState, useEffect } from 'react';

const PaymentModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [selectedDelivery, setSelectedDelivery] = useState('home'); // 'home' o 'pickup'
  const [address, setAddress] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Iniciar animación al cargar el modal
  }, []);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShow(false); // Animación de salida
    setTimeout(onClose, 300); // Cerrar el modal después de la animación
  };

  const handleBuyNow = () => {
    onBuyNow(product, address); // Pasar la dirección al comprar
    setShow(false); // Animación de salida
    setTimeout(onClose, 300); // Cerrar el modal después de la animación
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        className={`bg-white rounded-lg p-6 w-96 transform transition-all duration-300 ease-in-out ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Método de Pago</h2>
        <div className="flex mb-4">
          <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mr-4" />
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">Precio: {product.price}</p>
          </div>
        </div>
        
        {/* Sección de entrega */}
        <h3 className="font-semibold mb-2">Elige la forma de entrega:</h3>
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="home"
              checked={selectedDelivery === 'home'}
              onChange={() => setSelectedDelivery('home')}
            />
            Enviar a domicilio
          </label>
          {selectedDelivery === 'home' && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Ingresa tu dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="pickup"
              checked={selectedDelivery === 'pickup'}
              onChange={() => setSelectedDelivery('pickup')}
            />
            Retirar en un punto de entrega
          </label>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold">{product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-2 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Agregar al carrito
        </button>
        <button 
          onClick={handleBuyNow} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full transition duration-200 ease-in-out transform hover:scale-105"
        >
          Comprar
        </button>
        <button 
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }} 
          className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full transition duration-200 ease-in-out transform hover:scale-105"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
