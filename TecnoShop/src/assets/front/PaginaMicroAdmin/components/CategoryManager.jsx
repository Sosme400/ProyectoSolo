import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // URL base del backend
  const API_URL = 'http://localhost:8000/categories';

  // Obtener categorías al cargar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data); // Asume que el backend devuelve un array de categorías
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;

    try {
      const response = await axios.post(API_URL, { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error al añadir categoría:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Gestión de Categorías</h2>

        <form onSubmit={handleAddCategory} className="mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nueva categoría"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-150"
            >
              Añadir
            </button>
          </div>
        </form>

        <div>
          <h3 className="text-xl font-semibold mb-4">Categorías existentes</h3>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <span>{category.name}</span>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
