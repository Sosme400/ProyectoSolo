import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaClipboardList, FaShoppingCart, FaCog, FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function UserSidebar({ isCollapsed, toggleSidebar, profileImage, userName, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginReminder, setShowLoginReminder] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setUser(null); // Limpiamos el estado del usuario
    setShowLoginReminder(true); // Mostramos el modal de recordatorio de inicio de sesión
  };

  const confirmLoginRedirect = () => {
    setShowLoginReminder(false); // Oculta el modal
    navigate('/login', { replace: true }); // Redirige a la ruta de inicio de sesión
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-black text-white fixed flex flex-col justify-between transition-all duration-300 shadow-lg`}
    >
      <div>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 focus:outline-none absolute top-4 right-4"
        >
          {isCollapsed ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
        </button>

        {/* Profile Information */}
        {!isCollapsed && (
          <div className="text-center py-6 border-b border-gray-700 tracking-wide">
            <div className="flex flex-col items-center">
              <img
                src={profileImage || 'https://via.placeholder.com/100'}
                alt="Perfil"
                className="w-16 h-16 rounded-full mb-2"
              />
              <span className="text-lg font-semibold">{userName || 'Usuario'}</span>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 mt-6 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                  isActive('/') ? 'bg-gray-800 text-white font-bold shadow-inner' : 'hover:bg-gray-800'
                }`}
              >
                <FaHome className="mr-3 text-lg" />
                {!isCollapsed && <span className="text-lg font-medium">Inicio</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/user-profile')}
                className={`px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                  isActive('/user-profile') ? 'bg-gray-800 text-white font-bold shadow-inner' : 'hover:bg-gray-800'
                }`}
              >
                <FaUser className="mr-3 text-lg" />
                {!isCollapsed && <span className="text-lg font-medium">Mi Perfil</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/user-orders')}
                className={`px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                  isActive('/user-orders') ? 'bg-gray-800 text-white font-bold shadow-inner' : 'hover:bg-gray-800'
                }`}
              >
                <FaClipboardList className="mr-3 text-lg" />
                {!isCollapsed && <span className="text-lg font-medium">Mis Pedidos</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/cart')}
                className={`px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                  isActive('/cart') ? 'bg-gray-800 text-white font-bold shadow-inner' : 'hover:bg-gray-800'
                }`}
              >
                <FaShoppingCart className="mr-3 text-lg" />
                {!isCollapsed && <span className="text-lg font-medium">Carrito</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/user-settings')}
                className={`px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                  isActive('/user-settings') ? 'bg-gray-800 text-white font-bold shadow-inner' : 'hover:bg-gray-800'
                }`}
              >
                <FaCog className="mr-3 text-lg" />
                {!isCollapsed && <span className="text-lg font-medium">Configuración</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-left hover:bg-gray-800 rounded-lg flex items-center text-lg font-medium transition duration-200"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          {!isCollapsed && 'Cerrar Sesión'}
        </button>
      </div>

      {/* Login Reminder Modal */}
      {showLoginReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Inicia sesión para continuar</h3>
            <p className="mb-6">Debes iniciar sesión para interactuar con los productos.</p>
            <button
              onClick={confirmLoginRedirect}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
