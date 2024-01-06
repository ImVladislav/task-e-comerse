import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const NavBarComp = () => {
  const getData = useSelector((state) => state.cartReducer.carts);

  const popover = <Popover id="popover-basic"></Popover>;
  return (
    <div>
      <Navbar bg="light" variant="light" className="shadow-sm bg-white py-4 ">
        <Container>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            <Navbar.Brand className="fw-bold fs-2">LOGO</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Nav.Link className="nav-link nav-link-ltr">
              <Link style={{ textDecoration: "none" }} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="nav-link nav-link-ltr">
              <Link style={{ textDecoration: "none" }} to="/products">
                Products
              </Link>
            </Nav.Link>
          </Nav>
          <div className="buttons">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button variant="outline-dark" className="me-2">
                  <i className="fa fa-shopping-cart me-2"></i>
                  {getData.length}
                </Button>
              </Link>
            </OverlayTrigger>
            <Button variant="outline-dark" className="me-2">
              <i className="fa fa-user-plus me-2"></i>Login
            </Button>
            <Button variant="outline-dark" className="me-2">
              <i className="fa fa-sign-in me-2"></i>Register
            </Button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComp;
