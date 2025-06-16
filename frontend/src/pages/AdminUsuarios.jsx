import { useEffect, useState } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import styles from "../styles/AdminPedidosyUsuario.module.css";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar usuarios");

      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los usuarios.");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <Container className={styles.contenedor}>
      <h2>Usuarios Registrados</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id} className={styles.tr}>
                <td className={styles.td}>{usuario._id}</td>
                <td className={styles.td}>{usuario.nombre}</td>
                <td className={styles.td}>{usuario.email}</td>
                <td className={styles.td}>{usuario.rol}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminUsuarios;
