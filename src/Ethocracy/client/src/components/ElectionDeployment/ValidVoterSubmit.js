import React, { Component } from "react";
import { Form } from "react-bootstrap";

class ValidVoterSubmit extends Component {

    constructor(props){
      super(props);
      this.handleUploadIdFile = this.handleUploadIdFile.bind(this);
      this.isValidated = false;
    }
  
    handleUploadIdFile(e) {
      e.preventDefault();
      let file = e.target.files;
      let reader = new FileReader();
      reader.readAsText(file[0]);
      let validVoters = [];
      reader.onload = (e) => {
        const fileContent = e.target.result.trim().split(",");
        this.props.setValidVoters(fileContent);
      }
      this.isValidated = true; 
    }
  
    render() {
      return (
        <Form validated={this.isValidated}>
          <Form.File type="file" id="file" label ={this.isValidated ? "File Uploaded" : "Upload Valid Voter IDs"} onChange={this.handleUploadIdFile} custom/>
        </Form>
      )
    }
  }

  export default ValidVoterSubmit;