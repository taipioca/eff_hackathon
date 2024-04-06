import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import onClickOutside from 'react-onclickoutside'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'

// this imports the data file
var data = require('./data/data.json');

/*
This function gets the top trackers from the data file uploaded by the user
*/
function get_top_trackers() {

  var snitches = {};

  // Variable for Top __ websites with trackers on different websites
  var top_num = 10
  // populate the snitches dict from the snitch_map
  for (let tracker in data['snitch_map']) {
    var websites = data['snitch_map'][tracker];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i] in snitches){
        snitches[websites[i]].push(tracker)
      } else {
        snitches[websites[i]] = [tracker];
      }
    }
  }

  // Create items array
  var items = Object.keys(snitches).map(function(key) {
    return [key, snitches[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1].length - first[1].length;
  });

  // Create a new array with only the first top_num items
  var sorted_snitches_top = items.slice(0, top_num)

  return sorted_snitches_top;

}


class TrackerTab extends Component{

  // The render function first gets the top trackers then renders the HTML for
  // the tracker tab component
  render(){
    var trackers_list = get_top_trackers()
    var selectedSiteTrackers = this.props.selectedSite ? trackers_list.find(datas => datas[0] === this.props.selectedSite) : null;

    return (
      <div className="flex-container">
        {selectedSiteTrackers && 
          <div>
            <h2>{selectedSiteTrackers[0]}</h2>
            <ul class="tracker-list">
              {selectedSiteTrackers[1].map(tracker =>
                <li style={{listStyle: 'circle', marginLeft: '4px', marginTop: '2px', marginBottom: '2px'}}>{tracker}</li>
              )}
            </ul>
          </div>
        }

      </div>
    )
  }
}

export default TrackerTab;
