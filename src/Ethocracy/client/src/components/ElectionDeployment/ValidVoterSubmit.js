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
      const errormsg = "Wrong file selected"
      try {
        let file = e.target.files;
        if (file[0].type === "text/plain") {
          let reader = new FileReader();
          reader.readAsText(file[0]);
          reader.onload = (e) => {
            const fileContent = e.target.result.trim().replace(/\s/g, "").split(",");
            this.props.setValidVoters(fileContent);
          }
          this.isValidated = true; 
        } else {
          throw errormsg;
        }
      } catch (exception) {
        alert(errormsg);
      }
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