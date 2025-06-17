import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import DetallesProducto from "./pages/DetallesProducto";
import Carrito from "./pages/Carrito";
import MisPedidos from "./pages/MisPedidos";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPedidos from "./pages/AdminPedidos";
import AdminUsuarios from "./pages/AdminUsuarios";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/detallesproducto/:id" element={<DetallesProducto />} />

          {/* Rutas protegidas (requiere estar autenticado)*/}
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mispedidos"
            element={
              <ProtectedRoute>
                <MisPedidos />
              </ProtectedRoute>
            }
          />

          {/* Rutas solo para admin */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedAdminRoute>
                <AdminPedidos />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedAdminRoute>
                <AdminUsuarios />
              </ProtectedAdminRoute>
            }
          />

          {/* Ruta por defecto: redirige a /productos si no se encuentra la ruta */}
          <Route path="*" element={<Navigate to="/productos" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
