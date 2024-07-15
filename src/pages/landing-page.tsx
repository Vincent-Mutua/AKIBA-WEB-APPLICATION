import React from "react";
import { Fragment } from "react";
import { Container, Button} from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import NavBar from "../components/navbar"; 
import Footer from "../components/footer"; 
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "../styles/Landingpage.css";

const LandingPage:React.FC = () => {
  return (
    <Fragment>
      <NavBar /> {/* The Header component will render here */}
      <div className="landing-page">
        <Container className="text-center">
          <h1 className="app-title">Welcome to Akiba</h1>
          <p className="lead">Building your financial life brick by brick</p>
          <p className="quote">"If we command our wealth, we shall be rich and free. If our wealth commands us, we shall be poor indeed."</p>
          <p className="author">- Edmund Burke</p>
          <div className="mt-5">
            <p className="ready">Ready to achieve your financial goals?</p>
            <Button variant="dark" className="me-3 bg-dark">
              <Link to="/register" className="text-white text-decoration-none bg-dark">
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