import React, { Component } from "react";
import { Card, Row, Col, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import "./App.css";
import * as d3 from "d3";
import Alert from "react-bootstrap/Alert";
import BarTracked from "./BarTracked";
import BarFreq from "./BarFreq";
import "./Viz.css";
import UploadModal from "./UploadModal"; // Import the UploadComponent
import Summary from "./Summary";
import { withRouter } from 'react-router-dom';

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
        <h1 class="header">Let's Break this Down</h1>
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
        <Card title="Most Tracked Sites (Top 10)" bordered={false} >
          <BarTracked />
        </Card>

        <br></br>
        <div className="bottom-container">
        <Card
          title="Tracker Types"
          bordered={false}
          className="tracker-types-card"
        >
          <BarFreq />
        </Card>

        <Card
  title="What Types of Sites are Trackers On?"
  bordered={false}
  onClick={() => this.props.history.push('/categorization')}
>
  <p> click me </p>
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