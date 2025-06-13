import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function Login() {
    useEffect(() => {
  document.title = "Iniciar sesión";
}, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al iniciar sesión");

      localStorage.setItem("token", data.token);
      navigate("/productos");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className={styles.container}>
      <Row className={styles.registerForm}>
        <Col>
          <h2>Iniciar Sesión</h2>

          <Form onSubmit={handleLogin}>
          
            {error && <Alert variant="danger">{error}</Alert>}
          
            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Ingresa tu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className={styles.input}
              />
            </Form.Group>

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.label}>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Ingresa tu contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className={styles.input}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className={styles.button}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
