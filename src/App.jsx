import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import Cart from "./pages/public/Cart";
import ProductDetail from "./pages/public/ProductDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import AdminUsers from "./pages/admin/AdminUsers";
import ProtectedRoute, {
  AdminRoute,
  PublicRoute,
} from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/shop"
        element={
          <Layout>
            <Shop />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductDetail />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<div className="p-8 text-white">Orders Management (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-8 text-white">Settings (Coming Soon)</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
