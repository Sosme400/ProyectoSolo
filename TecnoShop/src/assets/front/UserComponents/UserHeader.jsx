import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import logo from '/src/assets/front/images/tecnoshop.png'; // Ruta absoluta para Vite

const UserHeader = ({ user, setUser, products, stores, isSidebarCollapsed }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/LoginUsuarios');
  };

  return (
    <header 
      className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50"
      style={{ marginLeft: isSidebarCollapsed ? '5rem' : '16rem' }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="TiendaMC Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <span className="text-gray-700 font-bold text-2xl">Tienda MC</span>
        </div>
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 font-medium flex items-center"
        >
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
