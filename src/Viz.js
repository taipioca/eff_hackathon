import React, { Component } from "react";
import { Card, Row, Col, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./App.css";
import BarTracked from "./BarTracked";
import BarFreq from "./BarFreq";
import "./Viz.css";
import UploadModal from "./UploadModal";
import Summary from "./Summary";
import { withRouter } from "react-router-dom";
import Categorization from "./Categorization";
var data = require("./data/data.json");

class Viz extends Component {
  state = {
    isUploadModalOpen: false,
  };

  get_total_num_trackers() {
    var total_num = Object.keys(data["snitch_map"]).length;
    return total_num;
  }

  openUploadModal = () => {
    this.setState({ isUploadModalOpen: true });
  };

  closeUploadModal = () => {
    this.setState({ isUploadModalOpen: false });
  };

  render() {
    return (
      <div className="viz-container">
        <h1 class="header viz-title">Breaking Down the Data</h1>
        <br></br>
        <p>
          See analytics on the top tracked sites, top tracker types, and what
          type of site gets tracked the most for a specific day's data from the
          Privacy Badger. Uploading a new file will replace automatically update
          the data on the page!
        </p>
        <div className="upload-button-container">
          <Button
            className="upload-button"
            icon={<UploadOutlined />}
            onClick={this.openUploadModal} // Open the upload modal when the button is clicked
          >
            Upload a new file
          </Button>
        </div>
        <br></br>

        <Summary />
        <br></br>
        <Card
          title="Top Canvas Fingerprinting Users"
          bordered={false}
          className="tracker-types-card"
        >
          <p>
            Top 10 users of canvas fingerprinting organized by the highest
            number of trackers detected on the site. Click on any bar to reveal
            the trackers found to be monitoring the website.
          </p>
          <BarTracked />
        </Card>

        <br></br>
        <div className="bottom-container">
          <Card
            title="Tracker Types"
            bordered={false}
            className="tracker-types-card"
          >
            <p>
              Distribution of different methods and technologies used in online
              tracking for the given day for each tracking relationship found.
            </p>
            <BarFreq />
          </Card>

          <Card
            title="What Types of Sites are Trackers On?"
            bordered={false}
            className="tracker-category-card"
          >
            <p>
              The types of websites that are monitored most based on the top 15
              sites with the most trackers detected. A categorization ML engine
              that scans a website's content and meta tags uses NLP to determine
              the most fitting categories for these sites.
            </p>
            <Categorization />
          </Card>
        </div>

        {this.state.isUploadModalOpen && (
          <UploadModal onClose={this.closeUploadModal} />
        )}
      </div>
    );
  }
}

export default withRouter(Viz);
