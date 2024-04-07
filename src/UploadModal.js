import React, { Component } from "react";
import axios from "axios";
import { Upload, Button, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Upload",
      isDisabled: false,
      selectedFile: null,
    };
  }

  onChangeHandler = (event) => {
    const file = event.target.files[0];
    const isJson = file.type === "application/json";
    if (!isJson) {
      message.error("Please upload a JSON file.");
    } else {
      this.setState({
        selectedFile: file,
        loaded: 0,
        isJsonSelected: true, // Set to true when a JSON file is selected
      });
    }
  };

  onClickHandler = () => {
    this.setState({
      msg: "Uploading...",
      isDisabled: true,
    });
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post("http://localhost:8000/upload", data).then((res) => {
      console.log(res.statusText);
      this.setState({
        msg: "Uploaded!",
      });
      message.success("Upload Successful!", 3); // Show success message
      if (typeof this.props.onSuccessfulUpload === "function") {
        this.props.onSuccessfulUpload(); // Notify parent component of successful upload
      }
      this.props.onClose(); // Close the modal when the upload is complete
    });
  };

  handleCancel = () => {
    this.props.onClose(); // Close the modal when the cancel button is clicked
  };

  render() {
    const { msg, isDisabled, isJsonSelected } = this.state; // Add isJsonSelected
    return (
      <Modal
        title="Upload a file to get started:"
        visible={true}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={this.onClickHandler}
            disabled={isDisabled || !isJsonSelected} // Disable the button if a JSON file is not selected
          >
            {msg}
          </Button>,
        ]}
      >
        <form method="post" action="#" id="#">
          <div className="form-group files">
            <input type="file" name="file" onChange={this.onChangeHandler} />
          </div>
        </form>
      </Modal>
    );
  }
}

export default UploadComponent;
