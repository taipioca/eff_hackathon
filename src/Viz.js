import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert';
import BarChart from './BarChart';
import Bubble from './Bubble';
import TrackerTab from './TrackerTab';
import Categorization from './Categorization';

var data = require('./data/data.json');

class Viz extends Component {
  /* This function returns the total number of trackers based on the info stored in the snitch_map
     each key in the snitch map refers to the top level domain of a tracker
  */
  get_total_num_trackers() {
    var total_num = Object.keys(data['snitch_map']).length;
    return total_num;
  }

  render() {
    return (
      <div className="container viz-container" style={{ width: '750px' }}>
        <div className="viz-page">
          <h1 class="header">
            <a href="/" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: '#00203FFF', borderColor: 'none', color: 'white' }}
              >
                Click to go back{' '}
              </button>
            </a>
            <hr></hr> Let's breakdown your data!
          </h1>
          <br></br>

          <Alert variant="danger">
            We found a total of <b>{this.get_total_num_trackers()} trackers</b> throughout your
            browsing data.<br></br>
            Each tracker comes from a different top-level-domain.
          </Alert>

          <br></br>
          <h4 class="header" style={{ marginBottom: 20 }}>
            What websites track you the most?
          </h4>
          <p>
            You probably have A LOT of trackers peeping your activity. We will first focus on the
            websites that track you the most.
            <br></br>
            <br></br>
            The top 10 websites based on the number of trackers they had -{' '}
          </p>
          <div>
            <BarChart />
          </div>

          <br></br>
          <br></br>

          <p>
            Next, it might be useful to look at the list of trackers for each of these top tracking
            websites.
          </p>
          <h4 class="header" style={{ marginBottom: 20 }}>
            What trackers were on these websites?
          </h4>

          <div>
            {' '}
            <TrackerTab />{' '}
          </div>
          <div>
            {' '}
            <Categorization />{' '}
          </div>

          <br></br>
          <hr></hr>
          <br></br>
          <h4 class="header" style={{ marginBottom: 20 }}>
            Which trackers were most prevalent?
          </h4>
          <p>
            What about the prevalence of trackers? Which ones appear most in your browsing? The
            following bubble chart shows the top 10 trackers based on their prevalence in your
            browsing. Clicking the bubbles will take you to the website of these trackers where you
            can find more information.
          </p>
          <Alert class="bubble_alert" variant={'info'}>
            Clicking a bubble will take you to the opt-out page of that tracker!
          </Alert>
          <div>
            <Bubble />
          </div>
        </div>
      </div>
    );
  }
}

export default Viz;
