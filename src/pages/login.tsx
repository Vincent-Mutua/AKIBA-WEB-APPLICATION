// src/components/SignIn.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { getErrorMessage } from "../utils/errorMessages";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "../config/firebase.js";
import "../styles/auth.css";
import Footer from "../components/footer.js";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Sign-in successful!");
      let usersRef = doc(db, "users", auth.currentUser.uid);
      getDoc(usersRef).then((snapshot) => {
        if (snapshot.data().role == "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      });
    } catch (error: any) {
      setMessage(getErrorMessage(error.code));
    }
  };

  const signInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      let usersRef = doc(db, "users", auth.currentUser.uid);
      getDoc(usersRef).then((snapshot) => {
        if (snapshot.data().role == "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      });
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
    <div className="page">
      <Container className="">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center mb-3">Welcome Back</h2>
            <h3 className="text-center mb-4">Sign In to Your Account</h3>
            {message && <div className="alert alert-info">{message}</div>}
            <Form className="register-form" onSubmit={handleSignIn}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="form-outline"
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
                  className="form-outline"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="w-100 mt-3"
                style={{
                  fontFamily: "Roboto",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Sign In
              </Button>
              <div className="text-center mt-3">
                <p>----------or----------</p>
              </div>
              <Button
                variant="outline-dark"
                onClick={signInWithGoogle}
                className="w-100 mt-3"
                style={{
                  fontFamily: "Roboto",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <i className="fab fa-google me-4"></i>
                Sign In with Google
              </Button>

              <div className="text-center mt-3">
                <p>
                  Forgot your password?{" "}
                  <a
                    href="/reset-password"
                    onClick={handlePasswordReset}
                    className="login-link"
                  >
                    Reset here
                  </a>
                </p>
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="login-link">
                    Register
                  </a>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SignIn;
