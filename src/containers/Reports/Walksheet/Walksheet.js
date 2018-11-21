import React, { Component } from 'react';
import classes from './Walksheet.css';
import VoterInformation from '../../../components/ReportsStuff/VoterInformation/VoterInformation'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Call} from '@material-ui/icons/'

export default class Walksheet extends Component {

  constructor() {
    super();
    this.WRD = React.createRef();
    this.PCT = React.createRef();
    this.VScore = React.createRef();
  }

  state = {
    elections: [],
    results: [],
    searched: false,
    viewBy: null,
    clicked: null,
    pct: null,
    wrd: null,
    voters: null,
    viewVoterInfo: false,

  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    //const ward = this.refs.WRD.value
    const ward = this.WRD.value;
    //const precinct = this.refs.PCT.value; 
    const precinct = this.PCT.value;
    const vscore = this.VScore.value;
    fetch(`http://localhost:5000/walklist?WRD=${ward}&PCT=${precinct}&VoteScore=${vscore}` )
    .then(res => res.json()) 
    .then(json => {
      this.setState({
        results: json,
        searched: true,
        viewBy: null
      })
    });
  };

  onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

 componentDidMount() {
    fetch('http://localhost:5000/WRD')
    .then(res => res.json())
    .then(json => {
      this.setState({
        wrd: json
      })
    });
    fetch('http://localhost:5000/PCT')
    .then(res => res.json())
    .then(json => {
      this.setState({
        pct: json
      })
    });
 }
 

  handleSort = (e) => {
    if (!this.state.viewBy) {
      this.setState({viewBy: e.target.value })
    } else if (this.state.viewBy) {
      this.setState({viewBy: e.target.value})
    }
  }

  viewAllHandler = () => {
    if (this.state.viewBy) {
      this.setState({viewBy: null})
    }
  }

  nameClickHandler = (name) => {
    if (!this.state.clicked) {
      this.setState({clicked: name})
    } else if (this.state.clicked) {
      this.setState({clicked: name})
    };
    fetch(`http://localhost:5000/voterdata?name=${name}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        voters: json,
      })
    })
}


handleViewMoreInfo = (voterID) => {
      fetch(`http://localhost:5000/electiondata?voter_reg_num=${voterID}` )
      .then(res => res.json())
      .then(json => {this.setState({
          elections: json,
          viewVoterInfo: true
        })})
  }

  render() {
    let {viewBy, results, searched, pct, wrd, clicked, voters, viewVoterInfo, elections} = this.state;
    console.log(wrd);
  if (pct && wrd) {
    const precinct = 
        <select ref="PCT">
          {pct.data.map(precinct => (
            <option key={precinct.PCT} value={precinct.PCT}>Precinct {precinct.PCT}</option>
          ))}
        </select>

    const precincts = 
      <FormControl className={classes.Select} inputRef={ref => {this.PCT=ref;}} componentClass="select">
        {pct.data.map(precinct => (
          <option key={precinct.PCT} value={precinct.PCT}>Precinct {precinct.PCT}</option>
        ))}
      </FormControl>

    const ward = 
      <select ref="WRD">
      {wrd.data.sort().map(ward => (
        <option key={ward.WRD} value={ward.WRD}>Ward {ward.WRD}</option>
      ))}
      </select>

    const wards = 
            <FormControl className={classes.Select} inputRef={ref => {this.WRD =ref;}} componentClass="select">
              {wrd.data.sort().map(ward => (
                <option key={ward.WRD} value={ward.WRD}> {ward.WRD}</option>
              ))}
            </FormControl>

       
       
       if (searched && voters && (!viewBy || viewBy) && viewVoterInfo) {
        return (
          <div>
            {Object.values(voters).map(voter => (
                <VoterInformation
                    name={voter['0'].name}
                    voter_reg_num={voter['0'].voter_reg_num}
                    Address={voter['0'].Address}
                    City={voter['0'].City}
                    ZipCode={voter['0']['Zip Code']}
                    Gender={voter['0'].Gender}
                    birthyear={voter['0']['Birth year']}
                    voterstatus={voter['0']['Voter Status']}
                    BOR={voter['0'].BOR}
                    CON={voter['0'].CON}
                    CCD={voter['0'].CCD}
                    JUD={voter['0'].JUD}
                    LEG={voter['0'].LEG}
                    REP={voter['0'].REP}
                    WRD={voter['0'].WRD}/>
            ))}
  
          <br/>
          <div className={classes.Cards}>
                      <div className={classes.Heading}>VOTING HISTORY</div>
                      {elections.data.map(election => ( 
                          <div key={election.SFID} className="cards">
                              <div>{election.ElectionDate} ({election.HowVoted}) - {election.Party}</div>
                          </div>
                        ))}
                  </div>
     </div>
        )
      };
    if (searched && voters && (!viewBy || viewBy)) {
      return (
        <div>
          {Object.values(voters).map(voter => (
              <VoterInformation
                  name={voter['0'].name}
                  voter_reg_num={voter['0'].voter_reg_num}
                  Address={voter['0'].Address}
                  City={voter['0'].City}
                  ZipCode={voter['0']['Zip Code']}
                  Gender={voter['0'].Gender}
                  birthyear={voter['0']['Birth year']}
                  voterstatus={voter['0']['Voter Status']}
                  BOR={voter['0'].BOR}
                  CON={voter['0'].CON}
                  CCD={voter['0'].CCD}
                  JUD={voter['0'].JUD}
                  LEG={voter['0'].LEG}
                  REP={voter['0'].REP}
                  WRD={voter['0'].WRD}/>
          ))}

        <br/>
        {Object.values(voters).map(voter=>( 
          <button
            className={classes.Submit2} 
            onClick={() => this.handleViewMoreInfo(voter[0].voter_reg_num)}>VIEW MORE INFO
        </button>
        ))}
   </div>
      )
    };
    
    if (!searched) {
      return (
        <div>
          <form action="/walklist" method="get" onSubmit={this.handleSubmit} >
            {wards}
            {precincts}
            <FormControl className={classes.Select} componentClass="select" inputRef={ref => {this.VScore=ref}} >
                <option value="100">100</option>
                <option value="90">90</option>
                <option value="80">80</option>
                <option value="70">70</option>
                <option value="60">60</option>
                <option value="50">50</option>
                <option value="40">40</option>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="0">0</option>
            </FormControl>
            <input
              className={classes.Submit}
              type="submit" 
              value="RUN">
            </input>
          </form>
        </div>
      );
    };

    if (searched && !viewBy) {
        const sheet = 
          <div>
          {results.data.map(result => {
            if (result.Phone) {
              return (
              <div className={classes.WalksheetTable} key={result.voter_reg_num} key={result.voter_reg_num}>
              <div  onClick={() => this.nameClickHandler(result.name)} className={classes.Info}>
                <div className={classes.Name}>{result.name}</div>
                <div className={classes.Address}>{result.Address}</div>
                <div className={classes.BirthYear}><span className={classes.SubHeading}>Age:</span> {Math.floor(2018-result['Birth year'])}</div> &emsp;
                <div className={classes.Status}><span className={classes.SubHeading}>Voter Status:</span>{result['Voter Status']}</div> &emsp;
                <div className={classes.Scores}><span className={classes.SubHeading}>Voter Score:</span>{result.CandScore}/{result.VoteScore}</div>
              </div>
              <div className={classes.Divider}></div>
              <div className={classes.Phone}><a href="tel:{result.Phone}"><Call style={{color: '#8F80B7', transform: 'scale(-1.5, 1.5)'}}/></a> </div>
            </div>)
             } else {
               return (
                <div className={classes.WalksheetTable} key={result.voter_reg_num} key={result.voter_reg_num}>
                <div  onClick={() => this.nameClickHandler(result.name)} className={classes.Info}>
                <div className={classes.Name}>{result.name}</div>
                <div className={classes.Address}>{result.Address}</div>
                <div className={classes.BirthYear}><span className={classes.SubHeading}>Age:</span> {Math.floor(2018-result['Birth year'])}</div> &emsp;
                <div className={classes.Status}><span className={classes.SubHeading}>Voter Status:</span>{result['Voter Status']}</div> &emsp;
                <div className={classes.Scores}><span className={classes.SubHeading}>Voter Score:</span>{result.CandScore}/{result.VoteScore}</div>
              </div>

            </div>
               )
             }
          })}
          </div>;
        
        const addresses = results.data.map(address => (address.Address).split(" ").slice(1,4).join(' ')).filter(this.onlyUnique);

      return (
        <div>
        <form>
            View By Street:
              <select onChange={this.handleSort}>
                <option value="" selected>View All</option>
                {addresses.sort().map(address => (
                <option value={address} key={address}>
                  {address}
                </option>
              ))}
              </select>
        </form>
        <form action="/walklist" method="get" onSubmit={this.handleSubmit} >
            {wards}
            {precincts}
            <FormControl className={classes.Select} componentClass="select" inputRef={ref => {this.VScore=ref}} >
                <option value="100">100</option>
                <option value="90">90</option>
                <option value="80">80</option>
                <option value="70">70</option>
                <option value="60">60</option>
                <option value="50">50</option>
                <option value="40">40</option>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="0">0</option>
            </FormControl>
            <input
              className={classes.Submit} 
              type="submit" 
              value="RUN">
            </input>
          </form> 
          {sheet}
        </div>
      )
    }; 

    if (searched && viewBy) {
        const sheet = 
          <div>
          {results.data
          .filter(result => result.Address.includes(viewBy))
          .map(result => (
            <div onClick={() => this.nameClickHandler(result.name)} className={classes.WalksheetTable} key={result.voter_reg_num} key={result.voter_reg_num}>
              <div className={classes.Name}>{result.name}</div>
              <div >{result.Address}</div>
              <div >{result.CandScore}/{result.VoteScore}</div>
            </div>  
          ))}
          </div>;
    const addresses = results.data.map(address => (address.Address).split(" ").slice(1,4).join(' ')).filter(this.onlyUnique); 
  return (
    <div>
      <form>
        View By Street:
          <select className={classes.Select} onChange={this.handleSort}>
            <option value="">View All</option>
          {addresses.sort().map(address => (
            <option value={address} key={address}>
              {address}
            </option>
          ))}
        </select>
      </form>
      {sheet}
      <form action="/walklist" method="get" onSubmit={this.handleSubmit} >
          {wards}
          {precincts}
            <FormControl className={classes.Select} ref={ref => {this.VScore =ref}}  componentClass="select">
                <option value="100">100</option>
                <option value="90">90</option>
                <option value="80">80</option>
                <option value="70">70</option>
                <option value="60">60</option>
                <option value="50">50</option>
                <option value="40">40</option>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="0">0</option>
            </FormControl>
            <input
              className={classes.Submit} 
              type="submit" 
              value="RUN">
            </input>
          </form> 
    </div>
  )
    };
  } else return <div>COLLECTING DATAS</div>
  }
    
}