import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroClientes from "./registrologinclient/RegistroClientes";
import LoginUsuarios from "./registrologinclient/LoginUsuarios";
import LoginMicro from "./PaginaMicro/LoginMicro";
import RegistroMicro from "./PaginaMicro/RegistroMicro";
import AdminDashboard from "./PaginaMicroAdmin/AdminDashboard";
import ProductsTable from "./PaginaMicroAdmin/components/ProductsTable";
import CategoryManager from "./PaginaMicroAdmin/components/CategoryManager"; // Importa CategoryManager
import UserPage from "./UserComponents/UserPage";
import UserCompra from "./UserComponents/User-Compra";
import UserLayout from "./UserComponents/UserLayout";
import CartPage from "./UserComponents/CartPage";
import UserProfile from "./UserComponents/UserProfile";
import UserOrders from "./UserComponents/UserOrders";
import UserSettings from "./UserComponents/UserSettings";
import ProductDetails from "./UserComponents/ProductDetails";
import SuperPage from "./SuperAdmin/SuperPage";
import LoginSuperAdmin from "./SuperAdmin/LoginSuperAdmin";
import NavbarSuper from "./SuperAdmin/NavbarSuper";

function App() {
  const [cart, setCart] = useState([]); // Estado del carrito

  return (
    <div className="min-h-screen w-full">
      <Router>
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/registro" element={<RegistroClientes />} />
          <Route path="/LoginUsuarios" element={<LoginUsuarios />} />
          <Route path="/login-vendor" element={<LoginMicro />} />
          <Route path="/registro-micro" element={<RegistroMicro />} />
          <Route path="/login-superadmin" element={<LoginSuperAdmin />} />

          {/* Rutas del usuario con layout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserPage cart={cart} setCart={setCart} />} />
            <Route path="/user-compra" element={<UserCompra />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/user-settings" element={<UserSettings />} />
            <Route path="/product-details/:id" element={<ProductDetails />} /> {/* Incluye `:id` en la ruta */}
          </Route>

          {/* Rutas de administrador */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/products" element={<ProductsTable />} />
          <Route path="/admin-dashboard/categories" element={<CategoryManager />} /> {/* Nueva ruta para categorías */}

          {/* Ruta para ver detalles de la tienda */}
          <Route path="/store/:storeName" element={<UserPage />} />

          {/* Rutas de SuperAdmin con Navbar */}
          <Route
            path="/superadmin-dashboard"
            element={
              <div>
                <NavbarSuper /> {/* Incluye NavbarSuper en el dashboard */}
                <SuperPage />
              </div>
            }
          />
          <Route
            path="/superadmin-stores-products"
            element={
              <div>
                <NavbarSuper /> {/* Incluye NavbarSuper en la página de tiendas y productos */}
                <UserPage cart={cart} setCart={setCart} />
              </div>
            }
          />
          <Route
            path="/superadmin-product-details/:id"
            element={
              <div>
                <NavbarSuper /> {/* Incluye NavbarSuper en la página de detalles del producto para SuperAdmin */}
                <ProductDetails />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
