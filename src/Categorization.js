import React, { Component } from 'react';
import './App.css';
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
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODEyZTdmNTk0ODY2NTkwNmQ0ZjAwYjU3ZGFjZWI0ZDczOTA3Y2JkNTM4ZDMxOGQ2YmNkOTc2MDQ3ZmFkYjAxNzEwNzllOTNlNzZmZjVjYzMiLCJpYXQiOjE3MTI0NDE2ODkuMDQ1MDI2LCJuYmYiOjE3MTI0NDE2ODkuMDQ1MDI3LCJleHAiOjE3NDM5Nzc2ODkuMDMzNTU4LCJzdWIiOiIxMjIwMSIsInNjb3BlcyI6W119.NGpt7jq-WK-wYzfthS4gfEOn7ky8WnnGYDwEXs0TetSr352Nl4RZ2iOHRl9mAnQ22NIG4K10WXVco8e5IH2uPVkK9gXi-K7mLUkdMkbkWrnY7gMPrbnldnIZcwW7S4CjxFA5lUklcYoTWsgKYzdd2MTMi_xg2GrK1asxuBc5nYysnU_dXpJnrhCNHQZa4mvlAPMgr3xg0wgQemnqzI05KISUx0SZNrAu4FaNpBfPKgyq_Wya0JRf_UZwlA96s1hIsuBjJ7PUSvBsESdGlErTc4XZJ6KrlS0FQnl6QAqGyu2hIIrrgXlwrdOsZWJ3VhMNp1FQW79xPEBRe6kgasb9pu2izn2FsRKQKDiwO7oY68erMgYypA4aO763_pbQUksRY0RKU9ZF6gTVXdutL-ZYnIdQ586SYRQVucIvxkJ7OZJhj5xS_HptyJT9Ce-YsMJeihkkVtE5w4GshZ4YM0aCne839gMOFLTUB18bw1shjI0ZBNbw5z739rexJ6j9AYWIR5nPaTShsc-C7baIUxmhqKsaWLlqlYpaMTZoNGxRX5sZCBtELRXx2h-6-grpG2rCJjX5uUCu7cGvI-vq6aFzvk6ijDB-SSjiuRacLMozFXMoKPa7gJ1RP1X6JkfcfO8pKW7ODrrj7h0XHQCwYSGnXk2JODMosGQu1WJh1wY13xo',
      'cache-control': 'no-cache',
      // 'User-Agent': 'telnet',
    },
    processData: false,
    data: '{"url":"http://www.amazon.com"}',
  };

  let site_cat_list = [];
  for (let i = 0; i < tracker_data.length; i++) {
    site_cat_list[i] = [];
    site_cat_list[i][0] = tracker_data[i][0];
    let firstElement = 'http://www.' + tracker_data[i][0];
    settings.data = JSON.stringify({ url: firstElement });

    await $.ajax(settings).done(function (response) {
      site_cat_list[i][1] = response.domain.categories[0].name;
      console.log('trackers_data:', tracker_data);
      console.log('site_cat_list:', site_cat_list);
    });
  }
  return site_cat_list;
}

const cat_data = await updateTrackerData();
console.log('updated_trackers_data:', cat_data);

localStorage.setItem('tracker_data', JSON.stringify(cat_data));

// Retrieve tracker_data from localStorage
const cat_data_retrieve = JSON.parse(localStorage.getItem('tracker_data'));
console.log('retrieved_trackers_data:', cat_data_retrieve);

class Categorization extends Component {
  render() {
    return <div></div>;
  }
}

export default Categorization;
