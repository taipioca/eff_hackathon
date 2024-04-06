import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as D3 from "d3";
import { useHistory } from "react-router";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "No File Uploaded Yet",
      isDisabled: false,
      isUploaded: false,
      fileList: [],
      uploading: false,
    };
  }

  handleUpload = () => {
    const formData = new FormData();
    this.state.fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    this.setState({ uploading: true });

    // You can use any AJAX library you like
    axios
      .post("http://localhost:8000/upload", formData)
      .then(() => {
        this.setState({ fileList: [], uploading: false, isUploaded: true });
        message.success("upload successfully.");
      })
      .catch(() => {
        this.setState({ uploading: false });
        message.error("upload failed.");
      });
  };


  onChangeHandler = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded file, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList: newFileList });

    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      // Check if the file is a JSON file
      if (info.file.type !== "application/json") {
        message.error("Invalid file type. Please upload a JSON file.");
        return;
      }

      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        msg: `${info.file.name} file uploaded successfully`,
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const uploadProps = {
      name: "file",
      action: "http://localhost:8000/upload",
      headers: {
        authorization: "authorization-text",
      },
      onChange: this.onChangeHandler,
      fileList: this.state.fileList,
      onRemove: (file) => {
        const index = this.state.fileList.indexOf(file);
        const newFileList = this.state.fileList.slice();
        newFileList.splice(index, 1);
        this.setState({ fileList: newFileList });
      },
      beforeUpload: (file) => {
        if (file.type !== "application/json") {
          message.error("Invalid file type. Please upload a JSON file.");
          return Upload.LIST_IGNORE;
        }
        this.setState({ fileList: [...this.state.fileList, file] });
        return false;
      },
    };

    return (
      <Router>
        <div className="App-header">
          <div className="container">
            <h2 class="site_title">Privacy Badger Tracker Visualization</h2>
            <br></br>
            <p>Upload a file to get started:</p>
            <br></br>
            <div className="Upload">
              <h4>Choose file to upload</h4>

              <div className="container">
                <div class="row">
                  <div class="col-md-6">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                      type="primary"
                      onClick={this.handleUpload}
                      disabled={this.state.fileList.length === 0}
                      loading={this.state.uploading}
                      style={{
                        marginTop: 16,
                      }}
                    >
                      {this.state.uploading ? "Uploading" : "Start Upload"}
                    </Button>
                    {this.state.msg && <p>{this.state.msg}</p>}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-success btn-block"
              style={{ backgroundColor: "#FF6666", borderColor: "#FF6666" }}
              disabled={!this.state.isUploaded}
            >
              <a href="/viz" style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  class="btn btn-success btn-block"
                  style={{ backgroundColor: "#FF6666", borderColor: "#FF6666" }}
                >
                  Show Analytics
                </button>
              </a>
            </button>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;