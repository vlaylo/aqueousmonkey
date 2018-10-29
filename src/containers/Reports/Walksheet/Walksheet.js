import React, { Component } from 'react';
import classes from './Walksheet.css';
import VoterInformation from '../../../components/ReportsStuff/VoterInformation/VoterInformation'


export default class Walksheet extends Component {

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
    const ward = this.refs.WRD.value;
    const precinct = this.refs.PCT.value
    const vscore = this.refs.VScore.value
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
  if (pct && wrd) {
    const precincts = 
        <select ref="PCT">
          {pct.data.map(precinct => (
            <option key={precinct.PCT} value={precinct.PCT}>Precinct {precinct.PCT}</option>
          ))}
        </select>

    const wards = 
      <select ref="WRD">
      {wrd.data.sort().map(ward => (
        <option key={ward.WRD} value={ward.WRD}>Ward {ward.WRD}</option>
      ))}
      </select>
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
            className={classes.Submit} 
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
            <input
              type="submit" 
              value="RUN">
            </input>
            {wards}
            {precincts}
            <select ref="VScore" onChange={this.wardQueryHandler}>
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
            </select>
          </form>
        </div>
      );
    };

    if (searched && !viewBy) {
        const sheet = 
          <div>
          {results.data.map(result => ( 
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
              <select onChange={this.handleSort}>
                <option value="" selected>View All</option>
                {addresses.sort().map(address => (
                <option value={address} key={address}>
                  {address}
                </option>
              ))}
              </select>
        </form>
          {sheet}
          <form action="/walklist" method="get" onSubmit={this.handleSubmit} >
            <input
              type="submit" 
              value="RUN">
            </input>
            <select ref="WRD" onChange={this.wardQueryHandler}>
              {wrd.data.sort().map(ward => (
                <option key={ward.WRD} value={ward.WRD}>Ward {ward.WRD}</option>
              ))}
            </select>
             <select ref="PCT" onChange={this.wardQueryHandler}>
              {pct.data.map(precinct => (
                <option key={precinct.PCT} value={precinct.PCT}>Precinct {precinct.PCT}</option>
              ))}
            </select>
            <select ref="VScore" onChange={this.wardQueryHandler}>
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
            </select>
          </form> 
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
          <select onChange={this.handleSort}>
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
        <input
          type="submit" 
          value="RUN"></input>
            <select ref="WRD" onChange={this.wardQueryHandler}>
              {wrd.data.sort().map(ward => (
                <option key={ward.WRD} value={ward.WRD}>Ward {ward.WRD}</option>
              ))}
            </select>
             <select ref="PCT" onChange={this.wardQueryHandler}>
              {pct.data.map(precinct => (
                <option key={precinct.PCT} value={precinct.PCT}>Precinct {precinct.PCT}</option>
              ))}
            </select>
            <select ref="VScore" onChange={this.wardQueryHandler}>
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
            </select>
          </form> 
    </div>
  )
    };
  } else return <div>COLLECTING DATA</div>
  }
    
}