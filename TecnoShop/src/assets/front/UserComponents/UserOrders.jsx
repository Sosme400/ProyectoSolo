import React, { useState, useEffect } from 'react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchedOrders = [
      {
        id: 1,
        product: 'Producto 1',
        quantity: 2,
        price: '$200',
        status: 'Enviado',
        image: 'https://via.placeholder.com/100',
        orderDate: '2023-11-01',
        estimatedDelivery: '2023-11-05',
      },
      {
        id: 2,
        product: 'Producto 2',
        quantity: 1,
        price: '$150',
        status: 'En preparación',
        image: 'https://via.placeholder.com/100',
        orderDate: '2023-11-02',
        estimatedDelivery: '2023-11-06',
      },
    ];
    setOrders(fetchedOrders);
    setFilteredOrders(fetchedOrders);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilteredOrders(
      orders.filter((order) =>
        e.target.value ? order.status === e.target.value : true
      )
    );
  };

  const handleReorder = (product) => {
    alert(`Reordenando ${product}`);
  };

  return (
    <div
      className="p-6 flex flex-col items-center"
      style={{
        backgroundColor: '#ebdec2', // Fondo similar a UserPage
        border: '15px solid #8B4513', // Borde café
        minHeight: '100vh',
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 font-minecraft">Mis Pedidos</h2>

        {/* Barra de filtro */}
        <div className="mb-6">
          <label htmlFor="filter" className="block mb-2 text-gray-700 font-minecraft">
            Filtrar por estado:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-300 rounded-md font-minecraft"
          >
            <option value="">Todos</option>
            <option value="Enviado">Enviado</option>
            <option value="En preparación">En preparación</option>
          </select>
        </div>

        {filteredOrders.length > 0 ? (
          <ul className="space-y-6">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className="p-6 bg-gray-50 rounded-lg shadow flex items-start border border-[#8B4513]"
              >
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />

                <div className="flex-1">
                  <p className="mb-2 font-minecraft">
                    <strong>Producto:</strong> {order.product}
                  </p>
                  <p className="mb-2 font-minecraft">
                    <strong>Cantidad:</strong> {order.quantity}
                  </p>
                  <p className="mb-2 font-minecraft">
                    <strong>Precio:</strong> {order.price}
                  </p>
                  <p className="mb-2 font-minecraft">
                    <strong>Estado:</strong> {order.status}
                  </p>
                  <p className="mb-2 font-minecraft">
                    <strong>Fecha del pedido:</strong> {order.orderDate}
                  </p>
                  <p className="mb-2 font-minecraft">
                    <strong>Entrega estimada:</strong> {order.estimatedDelivery}
                  </p>

                  <button
                    onClick={() => handleReorder(order.product)}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-minecraft"
                  >
                    Reordenar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 font-minecraft">No tienes pedidos aún.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
