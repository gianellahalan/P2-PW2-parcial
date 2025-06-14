import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import styles from "./Carrito.module.css";

function Carrito() {
  useEffect(() => {
  document.title = "Mi Carrito";
  }, []);

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const cargarCarrito = () => {
    fetch("http://localhost:3000/api/carrito", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data.productos)) {
          setError("No se pudo obtener el carrito.");
        } else {
          setProductos(data.productos);
        }
      })
      .catch(() => setError("Error al conectar con el servidor."));
  };

  useEffect(() => {
    if (!token) {
      setError("Debes iniciar sesión para ver tu carrito.");
      return;
    }
    cargarCarrito();
  }, []);

  const eliminarProducto = async (productId) => {
    try {
      await fetch(`http://localhost:3000/api/carrito/eliminar/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cargarCarrito();
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

  const vaciarCarrito = async () => {
    try {
      await fetch("http://localhost:3000/api/carrito/vaciar", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cargarCarrito();
    } catch {
      setError("No se pudo vaciar el carrito.");
    }
  };

  const confirmarPedido = async () => {
    alert("Pedido confirmado. Gracias por tu compra!");
    // Aquí podrías enviar la orden al backend en el futuro
    await vaciarCarrito();
  };

  const total = productos.reduce((acc, prod) => {
    return acc + (prod.product?.precio || 0) * prod.cantidad;
  }, 0);

  return (
    <Container className={styles.containerG}>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {productos.length === 0 && !error && <p className={styles.pNoHay}>No hay productos en tu carrito.</p>}

        {productos.map((prod) =>
          prod.product ? (
            <Col key={prod._id} className={styles.containerC}>
              <Card className={styles.card}>
                <Card.Img className={styles.imgCard} variant="top" src={prod.product.imagen || "/placeholder.png"} />
                <Card.Body className={styles.cardBody}>
                  <Card.Title>{prod.product.nombre}</Card.Title>
                  <Card.Text>Precio: ${prod.product.precio}</Card.Text>
                  <Card.Text>Cantidad: {prod.cantidad}</Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(prod.product._id)}
                    className={styles.button}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ) : null
        )}
      </Row>

      {productos.length > 0 && (
        <div className={styles.divTotal}>
          <h2 className={styles.h2}>Tu Carrito</h2>
          <h4>Total: ${total}</h4>
          <Button variant="secondary" onClick={vaciarCarrito} className={styles.button2}>
            Vaciar carrito
          </Button>
          <Button variant="success" onClick={confirmarPedido} className={styles.button2}>
            Confirmar pedido
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Carrito;
