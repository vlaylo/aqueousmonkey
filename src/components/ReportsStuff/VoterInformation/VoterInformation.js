import React from 'react';
import classes from './VoterInformation.css'

const VoterInformation = (props) => {
    return (
           <div>
                <div className={classes.Cards} key={props.voter_reg_num} >
                    <div className={classes.Heading}>Voter Information</div>
                    <div className={classes.Subheading}>
                        <div>{props.name}</div>
                        <div>VoterID: {props.voter_reg_num}</div>
                        <div>{props.Address} <br/> {props.City}, {props.State} {props.ZipCode}</div>
                        <div>Gender: {props.Gender} &nbsp; Birth Year: {props.birthyear} &nbsp; Voter Status: {props.voterstatus} </div>
                    </div>
                </div>
                <div key={props.voter_reg_num} >
                    <div className={classes.Subheading}>
                        <div>Board of Review: {props.BOR}</div>
                        <div>Congressional District: {props.CON}</div>
                        <div>Cook County District: {props.CCD}</div>
                        <div>Judicial Circuit: {props.JUD}</div>
                        <div>Legislative District: {props.LEG}</div>
                        <div>Representative District: {props.REP}</div>
                        <div>Ward: {props.WRD}</div>
                    </div>
                </div>
           </div>

    )
}

export default VoterInformation;
