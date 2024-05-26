import React, { Component } from "react";
import "./App.css";
import $ from "jquery";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import "./Categorization.css";
// this imports the data file
var data = require("./data/data.json");

/*
This function gets the top trackers from the data file uploaded by the user
*/
function get_top_trackers() {
  var snitches = {};

  // Variable for Top __ websites with trackers on different websites
  var top_num = 15;
  // populate the snitches dict from the snitch_map
  for (let tracker in data["snitch_map"]) {
    var websites = data["snitch_map"][tracker];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i] in snitches) {
        snitches[websites[i]].push(tracker);
      } else {
        snitches[websites[i]] = [tracker];
      }
    }
  }

  // Create items array
  var items = Object.keys(snitches).map(function (key) {
    return [key, snitches[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1].length - first[1].length;
  });

  // Create a new array with only the first top_num items
  var sorted_snitches_top = items.slice(0, top_num);

  return sorted_snitches_top;
}

// Create a new list with website and the Categorization result from Klazify API
let site_categorization;

// Retrieve tracker_data from localStorage
const cat_data_retrieve = JSON.parse(localStorage.getItem("tracker_data"));
console.log("retrieved_trackers_data:", cat_data_retrieve);
class Categorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        colors: [
          "#52A5EC",
          "#3C3DA5",
          "#8446DB",
          "#2E86C1", // Deep Blue
          "#8E44AD", // Rich Purple
          "#3498DB", // Bright Blue
          "#9B59B6", // Vibrant Purple
          "#2980B9", // Royal Blue
          "#AF7AC5", // Lavender
          "#154360", // Dark Blue
        ],

        dataLabels: {
          style: {
            fontSize: "20px",
            wordWrap: "break-word",
            width: "100px",
          },
        },
        legend: {
          show: false,
          fontSize: "12px",
          position: "bottom",
          formatter: function (seriesName, opts) {
            // Retrieve the color for the current series
            const color = opts.w.globals.fill.colors[opts.seriesIndex];
            // Retrieve the corresponding category name
            const categoryName = opts.w.config.series[opts.seriesIndex].name;
            return `<span style="color:${color}">${categoryName}</span>`;
          },
        },
        chart: {
          height: 350,
          type: "treemap",
        },
      },
    };
  }

  componentDidMount() {
    this.updateTrackerData().then((jsonData) => {
      const series = this.prepareSeries(jsonData);
      this.setState({ series });
    });
  }

  updateTrackerData = async () => {
    let tracker_data = get_top_trackers();
    let promises = [];

    for (let i = 0; i < tracker_data.length; i++) {
      let firstElement = "http://www." + tracker_data[i][0];
      let settings = {
        async: true,
        crossDomain: true,
        url: "https://www.klazify.com/api/categorize",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTIyOWUyNTEzYjM5NmFiZDY3ZWM5YjY3YzBkOGI5NWQyZTc4YWNhYWE5OTI3N2VkMTJlYzMzNzhkMWY3MGE4OTNmYTFjZDIzZTA2ODEyM2IiLCJpYXQiOjE3MTI0NjUwNDguNTk3OTQxLCJuYmYiOjE3MTI0NjUwNDguNTk3OTQzLCJleHAiOjE3NDQwMDEwNDguNTkyOTU4LCJzdWIiOiIxMjIwNSIsInNjb3BlcyI6W119.0o1Uw41FrQ7wIAylf3jF0jLsa8RVJerUb6Kpfoxpri8vNe4cSX0ywKWjpqopado8jjfHcEM5-CHZfPSG-D86GdsrV3uLf0b0EA83-wvy1RSfBdKN91R8fS-hq04UgQyWc286TKOys__I9eSWaXmi9JrkOyypZ3VMci_R1lw2jjO10x1q5z021ic1OeuOiAI4XMaRFJbUy1Bb0H1IdFvQBkSwf1OXx-vwCKdCRe6NmTFiqM4ZjdaSKKo8T1wm2n1tKAuaPTHSx9P0Yt3d4s_gXt6rzceZcCMVSYnui4yV8yEm2MiwrJxId3mgwAV3jsJ71aZpvnO6YjoFCsjnaxDyqS3i-WAazdJVgbtyvg6dsG-aWaKmHXpC2oXco8CRM0vkFADzHKCIUSwO3u-icl8X-iSfiBb8xpnPJxMCuKbRtbUP7hUT-hH5iB6SVRFqzFMacb1uyXIMSJpsMVjLZNGgSzB5I9nqQiWfkl8lhG_8g0-8HUR4CTTzcRKVjZ6EDK69KC0jvCq01DH3hooHLAJwy02aUW231uilnTaLYuIuKVFkTGtiyIN7O8MjskSvKu45-MjBwQG3IcCPnnk-JdZoQ8RZpRuF1oUI2QeBGRRmcMixDHjrhZrNGVqwd4FI7uXM0WtdWtzG4AD-knHrahwIAEnqsBBQEyLl0V67WPozzC8",
          "cache-control": "no-cache",
        },
        processData: false,
        data: JSON.stringify({ url: firstElement }),
      };

      promises.push(
        new Promise((resolve, reject) => {
          $.ajax(settings).done((response) => {
            let site_cat = "Unknown";
            if (
              response.domain &&
              response.domain.categories &&
              response.domain.categories.length > 0
            ) {
              site_cat = response.domain.categories[0].name;
            }
            resolve([tracker_data[i][0], site_cat]);
          });
        })
      );
    }

    return Promise.all(promises);
  };

  prepareSeries = (jsonData) => {
    const categoryMap = {};

    jsonData.forEach((item) => {
      const siteName = item[0];
      const categories = item[1].split("/").map((category) => category.trim());

      let mainCategory = "Other";
      let subCategory = "Other";

      if (categories.length > 0) {
        mainCategory = categories[1] || "Other";
        subCategory = categories[categories.length - 1] || "Other";
      }

      if (!categoryMap[mainCategory]) {
        categoryMap[mainCategory] = [];
      }

      categoryMap[mainCategory].push({
        x: subCategory,
        y: 1,
      });
    });

    return Object.keys(categoryMap).map((category) => ({
      name: category,
      data: categoryMap[category],
    }));
  };

  render() {
    const { series, options } = this.state;

    return (
      <div className="chart-container">
        <div className="legend">
          {series.map((s, i) => (
            <div key={i} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: options.colors[i] }}
              ></span>
              <span className="legend-label">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="treemap"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default Categorization;
