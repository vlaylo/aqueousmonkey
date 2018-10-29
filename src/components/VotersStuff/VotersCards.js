import React, { Component } from 'react'
import classes from './VotersCards.css'
import ReportsPage from '../ReportsStuff/ReportsPage';
import Fade from 'react-reveal/'

export default class VotersCards extends Component {

    state = {
        query: '',
        results: '',
        searched: false,
        view: null,
      }
    
     handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searched === false) {
          this.setState({searched: !this.state.searched})
        };
        const voterName = this.refs.name.value;
        fetch('http://localhost:5000/voterdata?name=' + voterName)
        .then(res => res.json()) 
        .then(json => {
          this.setState({
            results: json 
          })
        });
      };
    
      
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
    
      queryHandler = (e) => {
        this.setState({query: e.target.value})
      }
      render() {
        
        let {results, searched, view, query} = this.state;
        //VIEW  INFORMATION ABOUT SELECTION
        if (searched && results && view) {
          return(
            <Fade duration={1000}>
            <div>
              <ReportsPage
                name={view}>
              </ReportsPage>
              <button
                className={classes.Submit2}
                onClick={this.returnHandler}>
                SEARCH AGAIN
              </button>
            </div>
            </Fade>    
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
                    placeholder="SEARCH"
                    onChange={this.queryHandler}
                    name="name"
                    ref="name"
                    required
                    /> &nbsp;
                <input
                    value="Search"
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
                  <Fade duration={1000}><div className={classes.Cards} key={result.voter_reg_num}  onClick={() => this.handleViewInfo(result.voter_reg_num)} key={result.voter_reg_num}>
                    <div className={classes.Heading}>{result.name}</div>
                  </div></Fade>
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
                    value="Search"
                    className={classes.Submit}
                    onClick={this.handleResults}
                    type="submit"
                    /> 
              </form>
              <div></div>
         </div>
        )};
    
      }
}
