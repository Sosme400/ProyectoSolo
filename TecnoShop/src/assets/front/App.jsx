import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroClientes from "./registrologinclient/RegistroClientes";
import LoginUsuarios from "./registrologinclient/LoginUsuarios";
import LoginMicro from "./PaginaMicro/LoginMicro";
import RegistroMicro from "./PaginaMicro/RegistroMicro";
import AdminDashboard from "./PaginaMicroAdmin/AdminDashboard";
import ProductsTable from "./PaginaMicroAdmin/components/ProductsTable";
import CategoryManager from "./PaginaMicroAdmin/components/CategoryManager";
import UserPage from "./UserComponents/UserPage";
import UserCompra from "./UserComponents/User-Compra";
import UserLayout from "./UserComponents/UserLayout";
import CartPage from "./UserComponents/CartPage";
import UserProfile from "./UserComponents/UserProfile";
import UserOrders from "./UserComponents/UserOrders";
import UserSettings from "./UserComponents/UserSettings";
import ProductDetails from "./UserComponents/ProductDetails";
import ProtectedRoute from "./UserComponents/ProtectedRoute"; // Cambia la importación

function App() {
  const [cart, setCart] = useState([]); // Estado del carrito

  return (
    <div className="min-h-screen w-full">
      <Router>
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/registro" element={<RegistroClientes />} />
          <Route path="/LoginUsuarios" element={<LoginUsuarios />} />
          <Route path="/login" element={<LoginUsuarios />} />
          <Route path="/login-vendor" element={<LoginMicro />} />
          <Route path="/registro-micro" element={<RegistroMicro />} />

          {/* Rutas del usuario con layout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserPage cart={cart} setCart={setCart} />} />
            <Route path="/user-compra" element={<UserCompra />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/user-settings" element={<UserSettings />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
          </Route>

          {/* Rutas de administrador protegidas */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/products"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProductsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/categories"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CategoryManager />
              </ProtectedRoute>
            }
          />

          {/* Ruta para ver detalles de la tienda */}
          <Route path="/store/:storeName" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
