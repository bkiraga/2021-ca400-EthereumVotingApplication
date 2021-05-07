import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Route, Switch } from "react-router-dom";
import "../../App.css";

const NavigationBar = (props) => (
  <div>
  <Navbar bg="dark" variant="dark">
  <Navbar.Brand as={Link} to="/">
  <img
  src={require("../../img/ethlogo.png")}
  width="32"
  height="52"
  className="d-inline-block align-top"
  alt="logo"
  />{" "}
  </Navbar.Brand>
  <Navbar.Brand>
  Ethocracy
  </Navbar.Brand>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/vote">Vote</Nav.Link>
      <Nav.Link as={Link} to="/create">Create</Nav.Link>
      <Nav.Link as={Link} to="/myelections">My Elections</Nav.Link>
      <Nav.Link as={Link} to="/myballots">My Ballots</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  </div>
);

export default NavigationBar;