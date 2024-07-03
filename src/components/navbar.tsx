// src/components/NavBar.tsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Akiba</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto ">
          <LinkContainer to="/about">
            <Nav.Link className="me-3">About</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact">
            <Nav.Link className="me-3">Contact</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/blog">
            <Nav.Link className="me-3">Blog</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
