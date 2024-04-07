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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODEyZTdmNTk0ODY2NTkwNmQ0ZjAwYjU3ZGFjZWI0ZDczOTA3Y2JkNTM4ZDMxOGQ2YmNkOTc2MDQ3ZmFkYjAxNzEwNzllOTNlNzZmZjVjYzMiLCJpYXQiOjE3MTI0NDE2ODkuMDQ1MDI2LCJuYmYiOjE3MTI0NDE2ODkuMDQ1MDI3LCJleHAiOjE3NDM5Nzc2ODkuMDMzNTU4LCJzdWIiOiIxMjIwMSIsInNjb3BlcyI6W119.NGpt7jq-WK-wYzfthS4gfEOn7ky8WnnGYDwEXs0TetSr352Nl4RZ2iOHRl9mAnQ22NIG4K10WXVco8e5IH2uPVkK9gXi-K7mLUkdMkbkWrnY7gMPrbnldnIZcwW7S4CjxFA5lUklcYoTWsgKYzdd2MTMi_xg2GrK1asxuBc5nYysnU_dXpJnrhCNHQZa4mvlAPMgr3xg0wgQemnqzI05KISUx0SZNrAu4FaNpBfPKgyq_Wya0JRf_UZwlA96s1hIsuBjJ7PUSvBsESdGlErTc4XZJ6KrlS0FQnl6QAqGyu2hIIrrgXlwrdOsZWJ3VhMNp1FQW79xPEBRe6kgasb9pu2izn2FsRKQKDiwO7oY68erMgYypA4aO763_pbQUksRY0RKU9ZF6gTVXdutL-ZYnIdQ586SYRQVucIvxkJ7OZJhj5xS_HptyJT9Ce-YsMJeihkkVtE5w4GshZ4YM0aCne839gMOFLTUB18bw1shjI0ZBNbw5z739rexJ6j9AYWIR5nPaTShsc-C7baIUxmhqKsaWLlqlYpaMTZoNGxRX5sZCBtELRXx2h-6-grpG2rCJjX5uUCu7cGvI-vq6aFzvk6ijDB-SSjiuRacLMozFXMoKPa7gJ1RP1X6JkfcfO8pKW7ODrrj7h0XHQCwYSGnXk2JODMosGQu1WJh1wY13xo",
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
