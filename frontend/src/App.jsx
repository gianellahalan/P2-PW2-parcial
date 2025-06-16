import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPedidos from "./pages/AdminPedidos";
import AdminUsuarios from "./pages/AdminUsuarios";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>}/>
          <Route path="/pedidos" element={
              <ProtectedAdminRoute>
                <AdminPedidos />
              </ProtectedAdminRoute>}/>
          <Route path="/usuarios" element={
            <ProtectedAdminRoute>
              <AdminUsuarios />
            </ProtectedAdminRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
