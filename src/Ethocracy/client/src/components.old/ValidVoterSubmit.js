import React, { Component } from "react";

class ValidVoterSubmit extends Component {
    constructor(props){
      super(props);
      this.handleUploadIdFile = this.handleUploadIdFile.bind(this);
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
    }
  
    render() {
      return (
        <div>
          <input type="file" name="file" onChange={this.handleUploadIdFile}/>
        </div>
      )
    }
  }

  export default ValidVoterSubmit;