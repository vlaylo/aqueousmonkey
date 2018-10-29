import React, { Component } from 'react'
import Walksheet from './Walksheet/Walksheet';
import ReportsPage from '../../components/ReportsStuff/ReportsPage';
import classes from './Reports.css'

export default class Reports extends Component {
  state = {
    query: '',
    results: '',
    searched: false,
    view: null,
  }


  handleViewInfo = (name) => {
    if (this.state.view == null) {
      this.setState({view: name})
    };
    console.log(this.state.view);
  }

  returnHandler = (e) => {
    e.preventDefault()
    if (this.state.results && this.state.searched) {
      this.setState({
        results: '',
        searched: false,
        view: null
      })
    }
  }

  render() {
    let {searched, results, view} = this.state;
    
    return (
      <div className={classes.Reports}>
        <Walksheet
          voterID={this.handler}
        />
        <div>MAKE CALLS</div>   
      </div>
    );
  }
}
