import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUser,
    FaClipboardList,
    FaShoppingCart,
    FaSignOutAlt,
    FaArrowLeft,
    FaArrowRight,
} from 'react-icons/fa';

export default function UserSidebar({ isCollapsed, toggleSidebar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const isActive = (path) => location.pathname === path;

    // Cargar datos del usuario desde localStorage al montar el componente
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(user.name || 'Usuario');
            setProfileImage(user.profileImage || 'https://via.placeholder.com/100');
        } else {
            setUserName('Invitado');
        }
    }, []);

    const handleLogout = () => {
        // Limpiar estado del usuario
        localStorage.removeItem('user');
        setUserName('Invitado');
        setProfileImage('');
        navigate('/login'); // Redirigir al login
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

                {!isCollapsed && (
                    <div className="text-center py-6 border-b border-gray-700 tracking-wide">
                        <div className="flex flex-col items-center">
                            <img
                                src={profileImage || 'https://via.placeholder.com/100'}
                                alt="Perfil"
                                className="w-16 h-16 rounded-full mb-2"
                            />
                            <span className="text-lg font-semibold">{userName}</span>
                        </div>
                    </div>
                )}

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
                    </ul>
                </nav>
            </div>

            <div className="px-4 py-3 border-t border-gray-700">
                {userName !== 'Invitado' ? (
                    <button
                        onClick={handleLogout}
                        className="w-full text-left hover:bg-gray-800 rounded-lg flex items-center text-lg font-medium transition duration-200"
                    >
                        <FaSignOutAlt className="mr-3 text-lg" />
                        {!isCollapsed && 'Cerrar Sesión'}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full text-left hover:bg-gray-800 rounded-lg flex items-center text-lg font-medium transition duration-200"
                    >
                        <FaSignOutAlt className="mr-3 text-lg" />
                        {!isCollapsed && 'Iniciar Sesión'}
                    </button>
                )}
            </div>
        </div>
    );
}
