import React, { Component } from "react";
import { Card } from "antd";
import data from "./data/data.json";
import "./Summary.css";
import calendarImage from "./images/calendar.jpg"; // Import the image
import fingerprintImage from "./images/fingerprint.png"; // Import the image
import keyImage from "./images/key.jpg"; // Import the image

class Summary extends Component {
  getUniqueWebsites() {
    const websites = new Set();
    Object.values(data.snitch_map).forEach((siteList) => {
      siteList.forEach((site) => websites.add(site));
    });
    return websites.size;
  }

  getUniqueTrackers() {
    return Object.keys(data.snitch_map).length;
  }

  getFormattedDate() {
    const date = new Date(data.version);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  render() {
    return (
      <div className="summary-container">
        <Card className=" tracker-types-card summary-card">
          <div className="card-content">
            <img src={keyImage} alt="Key" className="card-image" />{" "}
            <div>
              <h2>{this.getUniqueWebsites()}</h2>
              <p>Number of unique websites visited</p>
            </div>
          </div>
        </Card>

        <Card className=" tracker-types-card summary-card">
          <div className="card-content">
            <img
              src={fingerprintImage}
              alt="Fingerprint"
              className="card-image"
            />{" "}
            <div>
              <h2>{this.getUniqueTrackers()}</h2>
              <p>Number of unique trackers</p>
            </div>
          </div>
        </Card>

        <Card className="tracker-types-card summary-card">
          <div className="card-content">
            <img src={calendarImage} alt="Calendar" className="card-image" />{" "}
            <div>
              <h2>{this.getFormattedDate()}</h2>
              <p>Date of current dataset</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Summary;
