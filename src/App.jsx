import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/public/Home";
import Cart from "./pages/public/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute, { AdminRoute, PublicRoute } from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login"  element={<Login />}  />
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
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
