import React, { Component } from "react";
import { Card } from 'antd';
import "./App.css";
import * as d3 from "d3";
import Alert from "react-bootstrap/Alert";
import BarChart from "./BarTracked";
import "./Viz.css";
var data = require("./data/data.json");

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
          <Card title="Most Tracked Sites (Top 10)" bordered={false}>
            <BarChart />
          </Card>

          <br></br>
          <br></br>

          <Card title="Tracker Frequency" bordered={false}>
            {/* Tracker Frequency content goes here */}
          </Card>

          <div> </div>

          <br></br>
          <hr></hr>
          <br></br>

        </div>
      </div>
    );
  }
}

export default Viz;
