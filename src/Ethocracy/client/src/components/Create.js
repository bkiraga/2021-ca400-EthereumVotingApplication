import React from "react";
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Create = () => {

  return (
    
    <Container style={{padding: "5rem"}}>
      <Form.Row className="justify-content-md-center">
        <Col xs lg="3">
          <Form>
            <Form.Control type="text" placeholder="Candidate" />
            <br />
          </Form>
        </Col>
        <Col md="auto">
          <Button> Add Candidate </Button>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs lg="6">
          <Form.Label as="legend" column sm={10}>
            Voting Type
          </Form.Label>
          <br />
          <br />  
        </Col>
       <Col md="auto">
        <Form.Check
          type="radio"
          label="First Past the Post"
          name="FPP"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Single Transferable Vote"
          name="STV"
          id="formHorizontalRadios2"
        />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Label as="legend" column sm={10}>
          Voter File
          </Form.Label>
        </Col>
        <Col>
          <Form.Group>
            <Form.File id="voterinfo" />
          </Form.Group>
        </Col>
        
      </Form.Row>
    </Container>

  );
}

export default Create;