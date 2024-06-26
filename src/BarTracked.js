import React, { Component } from "react";
import Chart from "react-apexcharts";
import data from "./data/data.json";
import "./BarTracked.css";
import TrackerTab from "./TrackerTab";

class BarChart extends Component {
  constructor(props) {
    super(props);

    const sorted_snitches_top = this.get_top_trackers();

    this.state = {
      options: {
        colors: [
          // Colors for the bar graph
          "#2294F6",
          "#2A8AEF",
          "#3280E7",
          "#3977E0",
          "#416DD9",
          "#4964D2",
          "#515ACC",
          "#5941C5",
          "#6138BE",
          "#8446DB",
        ],

        chart: {
          type: "bar",
          height: 350,
          events: {
            click: (event, chartContext, config) => {
              if (config && config.hasOwnProperty("dataPointIndex")) {
                this.handleBarClick(config.dataPointIndex); // Handle the click event on the bar graph
              }
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: sorted_snitches_top.map((d) => d[0]),
          title: {
            text: "Number of Trackers",
          },
        },
        grid: {
          show: true,
          borderColor: "#fff",
        },
        yaxis: {
          labels: {
            show: true,
          },
          axisBorder: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="arrow_box" style="padding-left: 10px; padding-right: 5px;">' +
              "<span>" +
              w.globals.labels[dataPointIndex] +
              ": " +
              series[seriesIndex][dataPointIndex] +
              " trackers" +
              "</span>" +
              "</div>"
            );
          },
        },
      },
      series: [
        {
          data: sorted_snitches_top.map((d) => d[1]),
        },
      ],
      selectedSite: null,
    };
  }

  get_top_trackers() {
    var snitches = {};
    var top_num = 10;

    for (let tracker in data["snitch_map"]) {
      var websites = data["snitch_map"][tracker];
      for (var i = 0; i < websites.length; i++) {
        if (websites[i] in snitches) {
          snitches[websites[i]] += 1;
        } else {
          snitches[websites[i]] = 1;
        }
      }
    }

    var items = Object.keys(snitches).map(function (key) {
      return [key, snitches[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    return items.slice(0, top_num);
  }
  handleBarClick = (index) => {
    const sorted_snitches_top = this.get_top_trackers();
    if (index >= 0 && index < sorted_snitches_top.length) {
      this.setState({ selectedSite: sorted_snitches_top[index][0] });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="chart-container">
            <div className="chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="100%"
                height="500"
              />
            </div>
            <div className="tracker-tab">
              <TrackerTab selectedSite={this.state.selectedSite} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;
