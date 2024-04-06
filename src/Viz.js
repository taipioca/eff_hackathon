import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";
import Alert from "react-bootstrap/Alert";
import BarChart from "./BarChart";
import Bubble from "./Bubble";
import TrackerTab from "./TrackerTab";
import "./Viz.css";
var data = require("./data/data.json");
import { Card, Text } from "@nextui-org/react";

class Viz extends Component {
  /* This function returns the total number of trackers based on the info stored in the snitch_map
     each key in the snitch map refers to the top level domain of a tracker
  */
  get_total_num_trackers() {
    var total_num = Object.keys(data["snitch_map"]).length;
    return total_num;
  }

  render() {
    return (
      <div className="container viz-container">
        <div className="viz-page">
          <h1 class="header">
            <a href="/" style={{ textDecoration: "none" }}>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "#00203FFF",
                  borderColor: "none",
                  color: "white",
                }}
              >
                Click to go back{" "}
              </button>
            </a>
            <hr></hr> Tracker Breakdown
          </h1>
          <br></br>

          <br></br>
          <h4 class="header" style={{ marginBottom: 20 }}>
            Most Tracked Sites (Top 10)
          </h4>
          <Card css={{ mw: "400px" }}>
            <Card.Body>
              <BarChart />
            </Card.Body>
          </Card>

          <br></br>
          <br></br>

          <h4 class="header" style={{ marginBottom: 20 }}>
            Tracker Frequency
          </h4>

          <div> </div>

          <br></br>
          <hr></hr>
          <br></br>
          {/* <h4 class="header" style={{ marginBottom: 20 }}>
            Which trackers were most prevalent?
          </h4>
          <p>
            What about the prevalence of trackers? Which ones appear most in
            your browsing? The following bubble chart shows the top 10 trackers
            based on their prevalence in your browsing. Clicking the bubbles
            will take you to the website of these trackers where you can find
            more information.
          </p>
          <Alert class="bubble_alert" variant={"info"}>
            Clicking a bubble will take you to the opt-out page of that tracker!
          </Alert>
          <div>
            <Bubble />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Viz;
