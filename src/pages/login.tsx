// src/components/SignIn.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { getErrorMessage } from "../utils/errorMessages";

const SignIn: React.FC = () => {
const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Sign-in successful!");
      navigate('/Dashboard')// Optionally, you can redirect the user to a different page after sign-in.
    } catch (error: any) {
      setMessage(getErrorMessage(error.code));
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      setMessage(getErrorMessage(error.code));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-3">Welcome Back</h2>
          <h3 className="text-center mb-4">Sign In to Your Account</h3>
          {message && <div className="alert alert-info">{message}</div>}
          <Form onSubmit={handleSignIn}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Sign In
            </Button>

            <div className="text-center mt-3">
              <p>Forgot your password? <a href="/reset-password" onClick={handlePasswordReset}>Reset here</a></p>
              <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
