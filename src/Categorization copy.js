import React, { Component } from 'react';
import './App.css';
// import * as d3 from 'd3';
// import Alert from 'react-bootstrap/Alert'
// import  BarChart from './BarChart';
// import onClickOutside from 'react-onclickoutside'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import $ from 'jquery';

// this imports the data file
var data = require('./data/data.json');

/*
This function gets the top trackers from the data file uploaded by the user
*/
function get_top_trackers() {
  var snitches = {};

  // Variable for Top __ websites with trackers on different websites
  var top_num = 10;
  // populate the snitches dict from the snitch_map
  for (let tracker in data['snitch_map']) {
    var websites = data['snitch_map'][tracker];
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

// Creat a new list with website and the Categorization result from Klazify API
let site_categorization;

async function updateTrackerData() {
  let tracker_data = get_top_trackers();

  // This is the settings for API call to Klazify
  var settings = {
    async: true,
    crossDomain: true,
    url: 'https://www.klazify.com/api/categorize',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGJlNmRiMTM3MmM0M2Y4Y2UwMGYxOWUzNDkwMWE3MzdiNjlmODg1OTY0ZGIyZWZhMjhiYmZjMDk1YjVjMzY5NzU3ZmY5YmUxNDA0NzRjM2IiLCJpYXQiOjE3MTIzNzU4NDYuNTYzMzExLCJuYmYiOjE3MTIzNzU4NDYuNTYzMzEzLCJleHAiOjE3NDM5MTE4NDYuNTU2MzE1LCJzdWIiOiIxMjIwMCIsInNjb3BlcyI6W119.LKRg2geTOJiYqPpa2JVf3eaMF6y682c9ydPrd0iT1mmf-h-XWvUW5CzEgyOBBrxVwfN1S4PW4xOsc4gN-4pmpGWVgvfmOhVqSR3ZZs4qkiLdS86eP09-u8ICIWUT0UqLajnc7GUY5PiyXNpFGSqkJ_5i2nPyAyb7o0eBXKfw8R3BrxlP7c2_fB2Sg9qefV8IoUSuvRZpJQlWvA7knmbota7WISo0tXeMJjDKt6eRMJBHDAt2CD8vGhChO75gvE_6_AeoEkOyg3nc9SgDp_05ppUgSEkyMxvLx3BGueBWWvgeyZgK6SxhAA9G6P9es6AE_ZwFuLR664wkLrj7XL-ZiUsP3bY-4tRadJomgkP0IBbOkKruSD_Y9-DY6GyyLsj9znMkVgvhkIlgmGJftzAmyKYW0FfICntTzCd637Sc0rGN0hKi73tGGwGPjHhOgxuDxixdv1e5uMinfLaDEdvjA7GYRK6o0PAAripAk8YOiXRzXkCcV51e8ZHrVnMj5yMa0WoteF9-2WNufE1uPBcZdncO0NbXovp3Z9LkK29pYhcNcLvj5rFzQU0jyTO8swgsblcMgZP8ch4IKO_T8QvOgJFcjvUwGtllPpZEfFHFQ6b76fMmdKl7I7keHerisIKQzhBsiJWNZLzbujT_aZRvMNq9HhmwE8CsBLSTsorREFw',
      'cache-control': 'no-cache',
      // 'User-Agent': 'telnet',
    },
    processData: false,
    data: '{"url":"http://www.amazon.com"}',
  };

  for (let i = 0; i < tracker_data.length; i++) {
    let firstElement = 'http://www.' + tracker_data[i][0];
    settings.data = JSON.stringify({ url: firstElement });

    await $.ajax(settings).done(function (response) {
      tracker_data[i][1] = response.domain.categories[0].name;
      console.log('trackers_data:', tracker_data);
    });
  }
  return tracker_data;
}

site_categorization = await updateTrackerData();
console.log('site_categorization1:', site_categorization);

class Categorization extends Component {
  // The render function first gets the top trackers then renders the HTML for
  // the tracker tab component
  render() {
    // var site_categorization = get_top_trackers();
    // console.log('site_categorization:', site_categorization);
    // let site_categorization = await updateTrackerData();
    console.log('site_categorization2:', site_categorization);
    // var result = updateTrackerData();
    // console.log('updated_trackers_data:', result);

    return (
      <div className="flex-container">
        <Tab.Container id="tracker-tabs" defaultActiveKey="first">
          <Row class="tracker-list-box">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link variant="primary" className="header-tab" eventKey="first">
                    Categorization
                  </Nav.Link>
                </Nav.Item>
                {site_categorization.map((datas, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link variant="primary" eventKey={datas[0]}>
                      {datas[0]}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <p className="text-for-tabs">
                    {' '}
                    Click on a tab to view the categorization on that website!
                  </p>
                </Tab.Pane>
                {site_categorization.map((datas) => (
                  <Tab.Pane eventKey={datas[0]}>
                    <ul class="tracker-list">
                      {datas[1].map((categorization, index) => (
                        <li
                          key={index}
                          style={{
                            listStyle: 'circle',
                            marginLeft: '4px',
                            marginTop: '2px',
                            marginBottom: '2px',
                          }}
                        >
                          {categorization}
                        </li>
                      ))}
                    </ul>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Categorization;
