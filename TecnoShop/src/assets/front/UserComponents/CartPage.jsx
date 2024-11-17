import React, { useState } from 'react';

const CartPage = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);

  // Función para calcular el total al cargar el carrito
  React.useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
    setTotal(totalAmount);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index ? { ...item, cartQuantity: quantity } : item
    );
    setCart(updatedCart);
    calculateTotal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Tu carrito está vacío.</p>
      ) : (
        <div>
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Producto</th>
                <th className="p-2 border">Cantidad</th>
                <th className="p-2 border">Precio</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={item.cartQuantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      className="border rounded w-16 text-center"
                    />
                  </td>
                  <td className="p-2 border">${item.price}</td>
                  <td className="p-2 border">${item.price * item.cartQuantity}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end items-center">
            <h2 className="text-lg font-semibold">Total a Pagar: ${total}</h2>
          </div>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
