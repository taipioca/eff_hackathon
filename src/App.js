import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadModal from "./UploadModal";
import { Button } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploaded: false,
      isUploadModalOpen: false,
    };
  }

  handleSuccessfulUpload = () => {
    this.setState({ isUploaded: true });
  };

  openUploadModal = () => {
    this.setState({ isUploadModalOpen: true });
  };

  closeUploadModal = () => {
    this.setState({ isUploadModalOpen: false });
  };

  render() {
    return (
        <div className="App-header">
          <div className="container">
            <h2 class="site_title">Privacy Badger Tracker Visualization</h2>
            <Button type="primary" onClick={this.openUploadModal}>
              Upload a file to get started!
            </Button>
            {this.state.isUploadModalOpen && (
              <UploadModal 
                onSuccessfulUpload={this.handleSuccessfulUpload} 
                onClose={this.closeUploadModal}
              />
            )}
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
    );
  }
}

export default App;