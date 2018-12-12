import React, { Component } from 'react';
import classes from './ReportsPage.css';
import VoterInformation from './VoterInformation/VoterInformation'
import DetailedInformation from './VoterInformation/DetailedInformation'

export default class ReportsPage extends Component {

    
state = {
        voters: [],
        elections: [],
        tags: [],
        notes: [],
        showInfo: false,
        addedNote: false,
    }

    componentDidMount() {
        if (this.props.voterID) {
        fetch('http://localhost:5000/voterdata?name=' + this.props.voterID)
        .then(res => res.json())
        .then(json => {this.setState({
            voters: json})})
    } else {
        null
    };
    }

      onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

handleViewMoreInfo = (e) => {
    if (this.props.voterID && this.props.sfid) {
        e.preventDefault();
        fetch('http://localhost:5000/tagged?voterid=' + this.props.sfid)
        .then(res => res.json())
        .then(json => {this.setState({
            tags: json,
        })});
        fetch('http://localhost:5000/notes?voterid=' + this.props.sfid)
        .then(res => res.json())
        .then(json => {this.setState({
            notes: json,
        })});
        fetch('http://localhost:5000/electiondata?voter_reg_num=' + this.props.voterID)
        .then(res => res.json())
        .then(json => {this.setState({
            elections: json,
            showInfo: true,
        })});

    } 
}

/*handleViewMoreInfo = (e) => {
    if (this.props.name) {
        e.preventDefault();
        fetch('http://localhost:5000/electiondata?voter_reg_num=' + this.props.name)
        .then(res => res.json())
        .then(json => {this.setState({
            elections: json,
            showInfo: true,
        })})
    } 
}*/

returnHandler = () => {
    if (this.state.showInfo) {
        this.setState({showInfo: !this.state.showInfo})
    }
}


postHandler = async (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/notes' , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "Subject": this.refs.Subject.value,
            "SFID": this.props.sfid,
            "Note": this.refs.Note.value,
          })    
        })
    .then(res => console.log(this.props.sfid));
    this.setState({addedNote: true}, this.fetchUpdatedPosts)
};

fetchUpdatedPosts = () => {
    fetch('http://localhost:5000/notes?voterid=' + this.props.sfid)
    .then(res => res.json())
    .then(json => {this.setState({
        notes: json,
    })});
}

addAnotherNoteHandler = () => {
        this.setState({addedNote: false}, this.fetchUpdatedPosts)
}

  render() {
    let {voters, elections, showInfo, tags, notes, addedNote} = this.state;

    console.log(notes, addedNote)
    
    if (this.props.voterID && !showInfo) {
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
                <button
                    className={classes.Submit2} 
                    onClick={this.handleViewMoreInfo}>VIEW MORE INFO</button>
           </div>
          );
          
    } else if (this.props.voterID && this.props.sfid && showInfo) {
        let mappedtags = tags.data
        .map(tag => (tag.tag))            
        .filter(this.onlyUnique)


        let filteredtags = mappedtags
            .map(tag => (
                <div key={tag}>
                    {tag}
                </div>
            ))


        return (
            <div>
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
                </div>
                
                
                <DetailedInformation title="VOTING HISTORY">
                    {elections.data.map(election => ( 
                                    <div key={election.SFID} className="cards">
                                        <div>{election.ElectionDate} ({election.HowVoted}) - {election.Party}</div>
                                    </div>
                                ))}
                </DetailedInformation>
                <DetailedInformation title="VOTER TAGS">
                    {filteredtags}
                </DetailedInformation>
                <DetailedInformation title="VOTER NOTES">
                    {notes.data.map(note => ( 
                                <div key={note.Subject} className={classes.Notes}>
                                    <div className={classes.NotesSubject}>{note.Subject}</div>
                                    <div className={classes.NotesNote}>&emsp;{note.Note}</div>
                                </div>
                              ))}
                    {!addedNote ? 
                        <form onSubmit={this.postHandler} className={classes.NoteForm}>
                            <div className={classes.formLabel}>Subject</div>
                            <input name="Subject" ref="Subject" type="text" maxLength="150" required></input><br/>
                            <div className={classes.formLabel}>Note</div>
                            <textarea name="Note" ref="Note" className={classes.NotesTextBox} type="text" maxLength="150" required></textarea><br/><br/>
                            <input className={classes.Submit} type="submit" value="Add Note"></input>
                        </form> 
                        
                        : 

                        <div>
                            <div>Note successfully added!</div> <br/>
                            <input onClick={this.addAnotherNoteHandler} className={classes.Submit} type="submit" value="Add Another"/>
                        </div>}
                </DetailedInformation>
            </div>
        );
    };

  }
}
