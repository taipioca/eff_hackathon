import React, { Component } from 'react';
import { List } from 'antd';
import "./TrackerTab.css";
import InfiniteScroll from 'react-infinite-scroll-component';

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

}class TrackerTab extends Component {
  render() {
    var trackers_list = get_top_trackers()
    var selectedSiteTrackers = this.props.selectedSite ? trackers_list.find(datas => datas[0] === this.props.selectedSite) : null;

    return (
      <div className="flex-container">
        {selectedSiteTrackers ? 
          <div>
            <h2>Website: {selectedSiteTrackers[0]}</h2>
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
              }}
            >
              <InfiniteScroll
                dataLength={selectedSiteTrackers[1].length}
                next={() => {}}
                hasMore={false}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={selectedSiteTrackers[1]}
                  renderItem={tracker => (
                    <List.Item>
                      <List.Item.Meta
                        title={tracker}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </div>
          :
          <div>
            <h2>Select a site to view trackers</h2>
          </div>
        }
      </div>
    )
  }
}

export default TrackerTab;