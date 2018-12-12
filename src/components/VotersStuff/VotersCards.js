import React, { Component } from 'react'
import classes from './VotersCards.css'
import ReportsPage from '../ReportsStuff/ReportsPage';
import Fade from 'react-reveal/'
import {Button} from '@material-ui/core'

export default class VotersCards extends Component {

    state = {
        query: '',
        results: '',
        searched: false,
        view: null,
        sfid: null,
      }
    
     handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searched === false) {
          this.setState({searched: !this.state.searched})
        };
        if (this.state.searched === false) {
          this.setState({searched: !this.state.searched})
        };
        if (this.state.view) {
          this.setState({view: null})
        };

        const voterName = this.refs.name.value;
        fetch('http://10.1.10.81/voterdata?name=' + voterName)
        .then(res => res.json()) 
        .then(json => {
          this.setState({
            results: json 
          })
        });
      };
    
      
      /*handleViewInfo = (name) => {
        if (this.state.view == null) {
          this.setState({view: name})
        };
        console.log(this.state.view);
      }*/
      handleViewInfo = (voterID) => {
        if (this.state.view == null) {
          this.setState({view: voterID})
        };
      }

      storeSFID = (sfid) => {
        this.setState({sfid: sfid})
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
    
      queryHandler = (e) => {
        this.setState({query: e.target.value})
      }
      render() {
        
        let {results, searched, view, query, sfid} = this.state;
        console.log(view, sfid)
        //VIEW  INFORMATION ABOUT SELECTION
        if (searched && results && view) {
          return(
            <div>
              <div>
                <form className={classes.SearchForm} onSubmit={this.handleSubmit} method="get" action="/voterdata">
                    <input
                        className={classes.Input}
                        type="search"
                        placeholder="Search"
                        onChange={this.queryHandler}
                        name="name"
                        ref="name"
                        required
                        /> &nbsp;
                    <input
                        value="SEARCH"
                        className={classes.Submit}
                        onClick={this.handleResults}
                        type="submit"
                        /> 
                    </form>
              <div></div>
            </div>
              <ReportsPage
                voterID={view}
                sfid={sfid}>
              </ReportsPage>
            </div>
        )
      };
      
        //DISPLAY NAME RESULTS AFTER SEARCHING
        if (searched && results) {
          return (
            <div>
              <div>
                <form className={classes.SearchForm} onSubmit={this.handleSubmit} method="get" action="/voterdata">
                    <input
                        className={classes.Input}
                        type="search"
                        placeholder="Search"
                        onChange={this.queryHandler}
                        name="name"
                        ref="name"
                        required
                        /> &nbsp;
                    <input
                        value="SEARCH"
                        className={classes.Submit}
                        onClick={this.handleResults}
                        type="submit"
                        /> 
                    </form>
              <div></div>
            </div>
              <div>
                <div className={classes.Query}>Showing results for: "{query}" </div>
                {results.data.map(result => ( 
                  <Fade duration={1000}>
                    <div className={classes.Cards} key={result.voter_reg_num}  onClick={() => {this.handleViewInfo(result.voter_reg_num); this.storeSFID(result.SFID)}} key={result.voter_reg_num}>
                      <div className={classes.Avatar}>{result.name['1']}{result.name.split(" ").pop().charAt(0)}</div>
                      <div className={classes.Info}>
                        <div className={classes.Heading}>{result.name}</div>
                            <div className={classes.SubHeading}>
                              <div><span className={classes.SubSubHeading}>Voter ID:</span> {result.voter_reg_num}</div>
                              <div><span className={classes.SubSubHeading}>Voter Status:</span>{result['Voter Status']}</div>
                              <div><span className={classes.SubSubHeading}>Birth Year:</span>{result['Birth Year']}</div>
                              <div><span className={classes.SubSubHeading}>Gender: </span> {result.Gender}</div>
                            </div>
                        </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
        );
    
        } else {
    //THIS IS THE SEARCH FORM
        return (
         <div>
          <form className={classes.SearchForm} onSubmit={this.handleSubmit} method="get" action="/voterdata">
                <input
                    className={classes.Input}
                    type="search"
                    placeholder="Search"
                    onChange={this.queryHandler}
                    name="name"
                    ref="name"
                    required
                    /> &nbsp;
                <input
                    value="SEARCH"
                    className={classes.Submit}
                    onClick={this.handleResults}
                    type="submit"
                    /> 
              </form>
              <div className={classes.Query}>Search for voter information here.  Type the voter's name in the search field and click search to begin.</div>
         </div>
        )};
    
      }
}
