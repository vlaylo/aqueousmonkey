import React from 'react';
import classes from './VoterInformation.css'

const VoterInformation = (props) => {
    return (
           <div>
                <div className={classes.Cards} key={props.voter_reg_num} >
                    <div className={classes.Heading}>Voter Information</div>
                    <div className={classes.SubHeading}>{props.name}</div>
                    <div className={classes.SubHeading}>VoterID: {props.voter_reg_num}</div>
                    <div className={classes.SubHeading}>{props.Address} <br/> {props.City}, {props.State} {props.ZipCode}</div>
                    <div className={classes.SubHeading}>Gender: {props.Gender} &nbsp; Birth Year: {props.birthyear} &nbsp; Voter Status: {props.voterstatus} </div>
                </div>
                <div key={props.voter_reg_num} >
                    <div className={classes.SubHeading}>Board of Review: {props.BOR}</div>
                    <div className={classes.SubHeading}>Congressional District: {props.CON}</div>
                    <div className={classes.SubHeading}>Cook County District: {props.CCD}</div>
                    <div className={classes.SubHeading}>Judicial Circuit: {props.JUD}</div>
                    <div className={classes.SubHeading}>Legislative District: {props.LEG}</div>
                    <div className={classes.SubHeading}>Representative District: {props.REP}</div>
                    <div className={classes.SubHeading}>Ward: {props.WRD}</div>
                </div>
           </div>

    )
}

export default VoterInformation;
