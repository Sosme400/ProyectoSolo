import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // Para controlar qué item está siendo editado
  const [newQuantity, setNewQuantity] = useState(1);  // Para manejar la nueva cantidad

  // Obtener el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;  // Asegúrate de que el usuario esté logueado

  // Cargar el carrito desde el backend
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    setIsLoading(true);
    setError(null); // Reseteamos el error en cada solicitud
    try {
      const response = await axios.get(`http://localhost:8000/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      setError('Error al cargar el carrito.');
      console.error('Error al cargar el carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  // Manejar la eliminación de un producto del carrito
  const handleRemove = async (id) => {
    setIsLoading(true);
    setError(null); // Reseteamos el error
    try {
      // Enviar DELETE al servidor para eliminar el producto del carrito
      await axios.delete(`http://localhost:8000/cart/${id}`);

      // Actualizar el carrito en el frontend
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);  // Actualizamos el estado con el carrito modificado
    } catch (error) {
      setError('Error al eliminar el producto.');
      console.error('Error al eliminar producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar el cambio de cantidad de un producto
  const handleChangeQuantity = async (id) => {
    if (newQuantity <= 0) return; // No permitimos cantidades negativas o cero

    setIsLoading(true);
    setError(null); // Reseteamos el error
    try {
      // Enviar PUT al servidor para actualizar la cantidad
      await axios.put(`http://localhost:8000/cart/${id}`, { quantity: newQuantity });

      // Actualizar la cantidad en el frontend
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      setEditingItem(null);  // Salir del modo edición
    } catch (error) {
      setError('Error al actualizar la cantidad.');
      console.error('Error al actualizar la cantidad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item.id);  // Activar el modo edición para el producto seleccionado
    setNewQuantity(item.quantity);  // Establecer la cantidad actual en el input
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>

      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
              {/* Columna de la imagen */}
              <div className="w-1/4">
                <img src={item.image} alt={item.name} className="w-full h-auto rounded-md" />
              </div>
              
              {/* Información del producto */}
              <div className="w-3/4 pl-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p>Precio: ${item.price}</p>
                
                <div className="flex items-center mt-2">
                  {editingItem === item.id ? (
                    <>
                      <input
                        type="number"
                        min="1"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                        className="w-16 py-1 px-2 border rounded-md mr-2"
                      />
                      <button
                        onClick={() => handleChangeQuantity(item.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Cantidad: {item.quantity}</p>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Mostrar total */}
          <div className="mt-4">
            <strong>Total: ${total}</strong>
          </div>

          {/* Botón de proceder al pago */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => {
              // Lógica para proceder al pago
              alert("Procediendo al pago...");
            }}
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
