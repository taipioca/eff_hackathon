import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadModal from "./UploadModal";
import { Button } from "antd";

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
        <div className="home-container">
          <h2 className="site_title">PrivyProbe</h2>
          <p className="description">
            Visualize canvas fingerprinting and tracking data from the Privacy
            Badger with powerful analytic tools to protect from non-consensual
            commercial surveillance online. Learn more about EFF at
            https://www.eff.org/ and learn more about Privacy Badger at
            https://privacybadger.org/.
          </p>
          <Button
            type="primary"
            onClick={this.openUploadModal}
            shape="round"
            className="start-button"
          >
            Start Here
          </Button>
          {this.state.isUploadModalOpen && (
            <UploadModal
              onSuccessfulUpload={this.handleSuccessfulUpload}
              onClose={this.closeUploadModal}
            />
          )}
        </div>
        {this.state.isUploaded && (
          <div className="analytics-container">
            <Button
              onClick={() => (window.location.href = "/analytics")}
              className="analytics-button"
            >
              Launch Analytics
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
