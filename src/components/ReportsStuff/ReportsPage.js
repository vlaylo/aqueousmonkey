import React, { Component } from 'react';
import classes from './ReportsPage.css';
import VoterInformation from './VoterInformation/VoterInformation'

export default class ReportsPage extends Component {

state = {
        voters: [],
        elections: [],
        showInfo: false,
    }

    componentDidMount() {
        if (this.props.name) {
        fetch('http://localhost:5000/voterdata?name=' + this.props.name)
        .then(res => res.json())
        .then(json => {this.setState({
            voters: json})})
    } else {
        null
    };
    }

handleViewMoreInfo = (e) => {
    if (this.props.name) {
        e.preventDefault();
        fetch('http://localhost:5000/electiondata?voter_reg_num=' + this.props.name)
        .then(res => res.json())
        .then(json => {this.setState({
            elections: json,
            showInfo: true,
        })})
    }
}

returnHandler = () => {
    if (this.state.showInfo) {
        this.setState({showInfo: !this.state.showInfo})
    }
}

  render() {
    let {voters, elections, showInfo} = this.state;

    if (this.props.name && !showInfo) {
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

                <button
                    className={classes.Submit} 
                    onClick={this.handleViewMoreInfo}>VIEW MORE INFO</button>
           </div>
          );
          
    } else if (this.props.name && showInfo) {
        return (
            <div>
                <div className={classes.Cards}>
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
                </div>
                <div className={classes.Cards}>
                    <div className={classes.Heading}>VOTING HISTORY</div>
                    {elections.data.map(election => ( 
                        <div key={election.SFID} className="cards">
                            <div>{election.ElectionDate} ({election.HowVoted}) - {election.Party}</div>
                        </div>
                      ))}
                </div>
                <button
                    className={classes.Submit}
                    onClick={this.returnHandler}>
                        Return
                    </button>
            </div>
        );
    };

  }
}
