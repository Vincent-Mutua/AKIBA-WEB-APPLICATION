import React from "react";
import { Fragment } from "react";
import { Container, Button} from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import NavigationBar from "../components/navbar"; 
import Footer from "../components/footer"; 
import "bootstrap/dist/css/bootstrap-grid.min.css"

const LandingPage:React.FC = () => {
  return (
    <Fragment>
      <NavigationBar /> {/* The Header component will render here */}
      <div className="landing-page">
        <Container className="text-center mt-5">
          <h1>Welcome to Akiba</h1>
          <p className="lead">Building your financial life brick by brick</p>
          <div className="mt-4">
            <Button variant="primary" className="me-3 bg-dark">
              <Link to="/register" className="text-white text-decoration-none">
                Register
              </Link>
            </Button>
          </div>
        </Container>
      </div>
      <Footer /> 
    </Fragment>
  );
};

export default LandingPage;