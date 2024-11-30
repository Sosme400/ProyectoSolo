import React, { useState } from 'react';
import '@fontsource/press-start-2p';

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
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url('https://64.media.tumblr.com/65c8c911203774e0681f1cf8ce43abc4/tumblr_inline_pss2beonLI1vqq20o_640.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Press Start 2P", sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 248, 240, 0.95)',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
          color: '#333',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>Mi Perfil</h2>

        {/* Imagen de Perfil */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Perfil"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#666',
              }}
            >
              No Image
            </div>
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '10px', fontSize: '12px' }}
            />
          )}
        </div>

        {/* Información del Usuario */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          ) : (
            <p style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              {userInfo.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          ) : (
            <p style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              {userInfo.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Teléfono</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          ) : (
            <p style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              {userInfo.phone}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Dirección</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          ) : (
            <p style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              {userInfo.address}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {isEditing ? (
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Editar
            </button>
          )}
          {isEditing && (
            <button
              onClick={toggleEdit}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
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
