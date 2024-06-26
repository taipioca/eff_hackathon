import React, { Component } from "react";
import Chart from "react-apexcharts";
import data from "./data/data.json";
import "./BarTracked.css";

class PieChart extends Component {
  
  // Create a pie chart
  constructor(props) {
    super(props);

    const sorted_snitches_top = this.get_top_trackers();

    this.state = {
      options: {
        chart: {
          width: "100%",
          type: "pie",
        },
        labels: sorted_snitches_top.map((d) => d[0]),
        theme: {
          monochrome: {
            enabled: false, 
          },
        },
        colors: ["#4DA7FF", "#6E90FF", "#856FFF", "#B37FFF", "#70AFFF"],
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5,
            },
          },
        },
        dataLabels: {
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            right: 1,
            bottom: 1,
            blur: 0.5,
            opacity: 0.8,
            color: "#2A3FA4",
          },
          style: {
            fontSize: "14px",
            fontWeight: "normal", 
          },
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return [name, val.toFixed(1) + "%"];
          },
        },
        legend: {
          show: false,
        },
      },
      series: sorted_snitches_top.map((d) => d[1]),
    };
  }

  get_top_trackers() {
    const trackingTypes = {};

    // Iterate over the tracking_map object
    for (const website in data["tracking_map"]) {
      const trackingData = data["tracking_map"][website];
      for (const tracker in trackingData) {
        const types = trackingData[tracker];
        types.forEach((type) => {
          if (type in trackingTypes) {
            trackingTypes[type]++;
          } else {
            trackingTypes[type] = 1;
          }
        });
      }
    }

    // Convert trackingTypes object to array for sorting
    const items = Object.entries(trackingTypes);

    // Sort by count in descending order
    items.sort((a, b) => b[1] - a[1]);

    return items;
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
        />
      </div>
    );
  }
}

export default PieChart;
