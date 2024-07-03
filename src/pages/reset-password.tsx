// src/components/PasswordReset.tsx
import React, { useState, FormEvent, Fragment } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordReset = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent successfully!");
      setError(null);

      // Redirect to login page after 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Container className="auth-form border rounded shadow p-4">
          <div className="auth-header text-center">
            <h2>Reset Password</h2>
          </div>
          <Form onSubmit={handlePasswordReset}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Reset Password
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Remember your password?{" "}
            <Button variant="link" onClick={() => navigate("/login")}>
              Log in
            </Button>
          </p>
        </Container>
      </div>
    </Fragment>
  );
};

export default PasswordReset;
