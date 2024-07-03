import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LockScreen from "./lock-screen";
import UserProfile from "./user-profile"; // Import UserProfile component


const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [isLocked, setIsLocked] = useState(false);
  const [viewProfile, setViewProfile] = useState(false); // State to manage profile view
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      }
    };
    fetchUserName();
  }, []);

  const handleLock = () => {
    setIsLocked(true);
    window.history.pushState(null, "", window.location.href);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleViewProfile = () => {
    setViewProfile(true);
  };

  const handleBackToHome = () => {
    setViewProfile(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-left mb-3">
        <Col xs="auto">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={handleLock}>
            Lock Application
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleViewProfile}>
            Go to Profile
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {isLocked ? (
            <LockScreen onUnlock={handleUnlock} />
          ) : viewProfile ? (
            <>
              <UserProfile />
              <Button variant="secondary" onClick={handleBackToHome}>
                Back to Home
              </Button>
            </>
          ) : (
            <h1 className="text-center">Hello {userName}</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
