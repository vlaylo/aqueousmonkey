import React from 'react';
import classes from './VoterInformation.css'

const VoterInformation = (props) => {
    return (
           <div>
                <div className={classes.Cards} key={props.voter_reg_num} >
                    <div className={classes.Card}>
                        <div className={classes.Heading}>{props.name}</div>
                        <div className={classes.SubHeading}>{props.Address} <br/> {props.City}, {props.State} {props.ZipCode}</div> <br/>
                        <div><span className={classes.SubHeading}>VoterID: </span>{props.voter_reg_num}</div>
                        <div>
                            <span className={classes.SubHeading}>Gender </span> {props.Gender} &nbsp;<span className={classes.SubHeading}>Birth Year: </span>{props.birthyear} &nbsp; <span className={classes.SubHeading}>Voter Status: </span> {props.voterstatus}
                        </div><br/>
                        <div className={classes.History}>
                            <div>
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
                </div>
           </div>

    )
}

export default VoterInformation;
