import { Navbar, Nav, Container } from "react-bootstrap";

function HeaderAdmin() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Panel Admin</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/admin/productos">Productos</Nav.Link>
          <Nav.Link href="/admin/pedidos">Pedidos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HeaderAdmin;