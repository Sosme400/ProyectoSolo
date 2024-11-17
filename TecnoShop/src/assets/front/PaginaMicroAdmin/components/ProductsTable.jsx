import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit' o 'new'
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    image_url: '',
    nameColor: '#000000', // Color para el nombre
    descriptionColor: '#000000', // Color para la descripción
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const PRODUCTS_API_URL = 'http://localhost:8000/products';
  const CATEGORIES_API_URL = 'http://localhost:8000/categories';

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleOpenModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(
      product
        ? { ...product }
        : {
            id: null,
            name: '',
            description: '',
            price: '',
            quantity: '',
            category_id: '',
            image_url: '',
            nameColor: '#000000',
            descriptionColor: '#000000',
          }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({
      id: null,
      name: '',
      description: '',
      price: '',
      quantity: '',
      category_id: '',
      image_url: '',
      nameColor: '#000000',
      descriptionColor: '#000000',
    });
  };

  const handleSaveProduct = async () => {
    try {
      if (modalType === 'edit' && selectedProduct.id !== null) {
        await axios.put(`${PRODUCTS_API_URL}/${selectedProduct.id}`, selectedProduct);
      } else {
        await axios.post(PRODUCTS_API_URL, selectedProduct);
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${PRODUCTS_API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === parseInt(selectedCategory))
    : products;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        {/* Filtro de categorías */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleOpenModal('new')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Nuevo
            </button>
          </div>
        </div>

        {/* Tabla de productos */}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 bg-black text-white">ID</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Nombre</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Descripción</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Precio</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Cantidad</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Categoría</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Imagen</th>
              <th className="border border-gray-200 p-2 bg-black text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 text-center hover:bg-gray-100">
                <td className="p-2">{product.id}</td>
                <td className="p-2" style={{ color: product.nameColor }}>{product.name}</td>
                <td className="p-2" style={{ color: product.descriptionColor }}>{product.description}</td>
                <td className="p-2">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{categories.find((cat) => cat.id === product.category_id)?.name || 'N/A'}</td>
                <td className="p-2">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  ) : (
                    'No disponible'
                  )}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleOpenModal('edit', product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                {modalType === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={selectedProduct.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="color"
                  name="nameColor"
                  value={selectedProduct.nameColor}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  title="Color del nombre"
                />
                <textarea
                  name="description"
                  placeholder="Descripción"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="color"
                  name="descriptionColor"
                  value={selectedProduct.descriptionColor}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  title="Color de la descripción"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Cantidad"
                  value={selectedProduct.quantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <select
                  name="category_id"
                  value={selectedProduct.category_id}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="image_url"
                  placeholder="URL de la Imagen"
                  value={selectedProduct.image_url}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </form>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
