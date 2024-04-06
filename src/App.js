import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import * as D3 from 'd3';
import { useHistory } from 'react-router'


class App extends Component{

  constructor(props) {
      super(props);
        this.state = {
          msg : 'Upload',
          isDisabled: false,
          selectedFile: null
        }
    }

    onChangeHandler=event=>{
       this.setState({
         selectedFile: event.target.files[0],
         loaded: 0,
       })
     }

     onClickHandler = () => {
       this.setState({
         msg : 'Uploaded!',
         isDisabled: true
          });
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8000/upload", data, {
           // receive two    parameter endpoint url ,form data
       })
     .then(res => { // then print response status
         console.log(res.statusText)
      })
     }


  render() {
  return (

      <Router>
      <div className="App-header">
    <div className="container" style={{width: 800}}>
        <h2 class="site_title">Visualizing trackers accross the web using Privacy Badger</h2>
        <br></br>
          <p>
          Welcome!
          <p></p>
          Have you ever felt that the internet knows too much about you?
          Or have you felt ads that have just been too invasive? We are here to help you
          learn what the internet knows about you!
          Upload your tracking data downloaded from this <a className="url" href="https://github.com/aryan096/privacybadger" >modified Privacy Badger extension</a> that accurately
          captures information about trackers while you browse and we will help you understand!
          </p>
          <br></br>
          <div className="Upload">
        <h4>Choose file to upload</h4>

        <div className="container">
      	<div class="row">
      	  <div class="col-md-6">
      	      <form method="post" action="#" id="#">
                <div class="form-group files">
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                </div>
              </form>
              </div>
            </div>
            </div>
                </div>
            <button disabled={this.state.isDisabled} type="button"
            style={{backgroundColor: '#CCFF99', color: 'black', height: 50, borderColor: '#CCFF99'}}
            class="btn btn-success btn-block" onClick={this.onClickHandler}>
            {this.state.msg} </button>
            <button type="button" class="btn btn-success btn-block"
            style={{backgroundColor: '#FF6666', borderColor: '#FF6666'}}>
            <a href="/viz" style={{textDecoration: 'none'}}>
            <button type="button" class="btn btn-success btn-block"
            style={{backgroundColor: '#FF6666', borderColor: '#FF6666'}}>
            Show Viz!</button></a></button>
          </div>
        </div>

    </Router>
  );
}}

export default App;
