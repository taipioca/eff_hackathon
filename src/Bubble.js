import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";
import BubbleChart from '@weknow/react-bubble-chart-d3';

var data = require('./data/data.json');
var optout = require('./optoutlinks.js')

class Bubble extends Component {

  sort_trackers(obj){
    // convert object into array
  	var sortable=[];
  	for(var key in obj)
  		if(obj.hasOwnProperty(key))
  			sortable.push([key, obj[key]]); // each item is an array in format [key, value]

  	// sort items by value
  	sortable.sort(function(a, b){
  	  return b[1]-a[1]; // compare numbers
  	});
  	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  // colors for our color scheme
  getRandomColor(){
    let colorValues = ["#d69ae4", "#955fa2", "#74add4",
    "#3e4989", "#31688e", "#26828e", "#1f9e89", "#35b779", "#6ece58",
    "#de4b7a", "#de9e9e", "#54ccd2", "#eca183"];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
  }

  get_top_10_trackers(){
    var snitch_map = data['snitch_map']; // get snitch_map
    var output_list = [];

    // we want to find the keys that have the most values
    for(let tracker in snitch_map){
      snitch_map[tracker] = snitch_map[tracker].length;
    }
    snitch_map = this.sort_trackers(snitch_map);

    for(let i = 0; i < 25; i++){
      if(snitch_map[i]){
        let new_entry = {label:snitch_map[i][0], value:snitch_map[i][1], color: this.getRandomColor()};
        output_list.push(new_entry);
      } else {
        break;
      }
    }

    return output_list;
  }

  // HERE BEGINS CODE FOR BubbleChar



  bubbleClick(label){
    // This function is executed whenever a bubble is clicked. It looks through
    // our optoutlink database and opens it if it exists. Otherwise, it just
    // opens the label domain
    console.log(label, ' bubble was clicked...')
    var optoutlinks = optout['default'];

    for (let mapping in optoutlinks){
      if (optoutlinks[mapping]['Name'] == label){
        window.open(optoutlinks[mapping]['Link']);
        return 0;
      }
    }
    window.open('https://' + label, '_blank');
    return 0;
  }

  legendClick = (label) =>{
  console.log("Customer legend click func")
  }


  render(){
    var trackers = this.get_top_10_trackers();
    return(
      <div class="tracker_bubbles">
      <BubbleChart
        graph= {{
          zoom: 0.90,
          offsetX: 0.00,
          offsetY: -0.00,
          }}
          width={850}
          height={800}
          padding={-3} // optional value, number that set the padding between bubbles
          showLegend={false} // optional value, pass false to disable the legend.
          legendPercentage={30} // number that represent the % of with that legend going to use.
          overflow={true}
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 22,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 10.5,
            color: '#fff',
            weight: 'bold',
            marginTop: '-10px',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFun={this.bubbleClick}
          legendClickFun={this.legendClick}
          data={trackers}
        />
        </div>
    );
  }
}

export default Bubble;
