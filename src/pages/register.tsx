// src/components/Registration.tsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { auth, googleProvider, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getErrorMessage } from "../utils/errorMessages";

const Registration: React.FC = () => {
  const navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
      });

      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (error: any) {
      setMessage(getErrorMessage(error.code));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (userCredential.user.emailVerified) {
        setMessage("Google sign-in successful!");
      } else {
        setMessage("Google sign-in successful! Please verify your email.");
        await sendEmailVerification(userCredential.user);
      }
    } catch (error: any) {
      setMessage(getErrorMessage(error.code));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-3">Welcome</h2>
          <h3 className="text-center mb-4">Create an Account</h3>
          {message && <div className="alert alert-info">{message}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

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

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Register Account
            </Button>

            <div className="text-center mt-3">
              <p>or</p>
            </div>

            <Button
              variant="outline-danger"
              className="w-100 mb-3"
              onClick={handleGoogleSignIn}
            >
              <i className="fab fa-google me-2"></i> Continue with Google
            </Button>

            <div className="text-center">
              <a href="/login">Already have an account? Log in</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
