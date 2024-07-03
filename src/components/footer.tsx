import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC=() => {
  return (
    <footer className="bg-light py-4 mt-5 footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Akiba. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

