import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Route, Switch } from "react-router-dom";
import "../App.css";

const NavigationBar = (props) => (
  <div>
<<<<<<< HEAD
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">Ethocracy</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link><Link className="text-link" to="/">Home</Link></Nav.Link>
        <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/vote">Vote</Link></Nav.Link>
        <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/create">Create</Link></Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
=======
  <Navbar bg="dark" variant="dark">
  <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">Ethocracy</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} className="text-link" to="/">Home</Link></Nav.Link>
      <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/vote">Vote</Link></Nav.Link>
      <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/create">Create</Link></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
>>>>>>> develop
  </div>
);

export default NavigationBar;