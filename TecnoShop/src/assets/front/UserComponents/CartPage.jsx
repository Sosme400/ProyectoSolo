import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando el carrito

  // Obtener el userId desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;  // Si el usuario no está logueado, userId será null

  // Cargar el carrito del backend
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/${userId}`);
      setCart(response.data);  // Asume que el servidor responde con el carrito
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  };

  const calculateTotal = () => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const handleRemoveFromCart = async (productId) => {
    try {
      // Realizamos la petición para eliminar el producto
      await axios.delete(`http://localhost:8000/cart/${userId}/${productId}`);
      
      // Actualizamos el carrito en el frontend
      setCart(cart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity <= 0) return;

    try {
      await axios.put(`http://localhost:8000/cart/${id}`, { quantity });
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const handleProceedToPayment = async () => {
    if (!userId) {
      alert("Por favor inicia sesión para proceder con el pago.");
      return;
    }

    try {
      // Aquí hacemos la solicitud para disminuir el inventario
      const productUpdates = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      console.log(productUpdates);

      const response = await axios.post("http://localhost:8000/payment", {
        user_id: userId,
        products: productUpdates
      });

      if (response.data.success) {
        alert("Pago exitoso. Los productos han sido descontados del inventario.");
        setCart([]);  // Vaciar el carrito
      } else {
        alert("Hubo un problema al procesar el pago.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar el pago.");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Cambiar el estado de edición
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
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
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value))
                        }
                        className="border rounded w-16 text-center"
                      />
                    ) : (
                      <span>{item.quantity}</span> // Mostrar solo la cantidad si no estamos editando
                    )}
                  </td>
                  <td className="p-2 border">${item.price}</td>
                  <td className="p-2 border">${item.price * item.quantity}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)} // Pasamos el id del producto
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
            <h2 className="text-lg font-semibold">Total: ${total}</h2>
          </div>

          {/* Botón de editar carrito */}
          <button
            onClick={toggleEditMode}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Cancelar Edición" : "Editar Carrito"}
          </button>

          {/* Botón de proceder al pago */}
          <button
            onClick={handleProceedToPayment}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
