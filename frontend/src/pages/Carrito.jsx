import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Debes iniciar sesión para ver tu carrito.");
      return;
    }

    fetch("http://localhost:3000/api/carrito", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !Array.isArray(data.productos)) {
          setError("No se pudo obtener el carrito.");
        } else {
          setProductos(data.productos);
        }
      })
      .catch(() => setError("Error al conectar con el servidor."));
  }, []);

  return (
    <Container>
      <h2>🛒 Tu Carrito</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {productos.length === 0 && !error && <p>No hay productos en tu carrito.</p>}

        {productos.map((prod) => (
          <Col key={prod._id} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src={prod.imagen || "/placeholder.png"} />
              <Card.Body>
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text>Precio: ${prod.precio}</Card.Text>
                {/* Agregar botón de eliminar más adelante si querés */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Carrito;
