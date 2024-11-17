import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    phone: '123-456-7890',
    address: 'Calle Ejemplo 123, Ciudad Ejemplo',
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Información guardada:', userInfo);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>
        
        {/* Imagen de Perfil */}
        <div className="mb-4 flex flex-col items-center">
          {profileImage ? (
            <img src={profileImage} alt="Perfil" className="w-32 h-32 rounded-full mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          )}
        </div>
        
        {/* Información del Usuario */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="p-2 bg-gray-200 rounded">{userInfo.name}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="p-2 bg-gray-200 rounded">{userInfo.email}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="p-2 bg-gray-200 rounded">{userInfo.phone}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="p-2 bg-gray-200 rounded">{userInfo.address}</p>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Editar
            </button>
          )}
          {isEditing && (
            <button
              onClick={toggleEdit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
