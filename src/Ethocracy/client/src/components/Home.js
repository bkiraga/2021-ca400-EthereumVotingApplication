import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, Route, Switch } from "react-router-dom";

import Tenets from "./Tenets";


const Home = (props) => (
  <div style={{padding: "5rem"}}>
  <Container>
    <Row>
      <Col><Tenets /></Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col>
      <Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={require("../img/vote.png")} alt="vote.png" />
      <Card.Body>
        <Card.Title>Participate in a Vote</Card.Title>
        <Card.Text>
          Vote in an active election or view the results of a past election.
        </Card.Text>
        <Button to="/vote" variant="success"><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/vote">Browse Elections</Link></Button>
      </Card.Body>
    </Card>
      </Col>
      <Col><Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={require("../img/organise.png")} alt="organise.png" />
      <Card.Body>
        <Card.Title>Organise an Election</Card.Title>
        <Card.Text>
          Create a new election instance with custom settings.
        </Card.Text>
        <Button variant="primary"><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/create">Organise Election</Link></Button>
      </Card.Body>
    </Card></Col>
    </Row>
  </Container>
  </div>
);

export default Home;