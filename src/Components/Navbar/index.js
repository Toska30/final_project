import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase";

const TopBar = () => {
  let navigate = useNavigate();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-4">
      <Navbar.Brand href="/home" className="App-logo">
        Toy Exchange
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ flex: 1 }}>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/favourites">My Favourite</Nav.Link>
          <Nav.Link href="/add-products">Add Products</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>

        <Nav className="ml-auto" style={{ float: "right" }}>
          <Button onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
