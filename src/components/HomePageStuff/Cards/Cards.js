import React from 'react';
import {NavLink} from 'react-router-dom'


import classes from './Cards.css'

const Cards = (props) => (
  <div className={classes.Cards}>
    <div className={classes.Welcome}>LOREM</div>
    <a href="/voters" className={classes.Lookup}>Voter Lookup</a>
    <a href="/reports" className={classes.Precinct}>Walk Precinct</a>
    <div className={classes.Calls}>Make Calls</div>
    <div className={classes.Logout}>Logout</div>
    <div className={classes.Questions}>Questions? Contact us at 777-777-7777 or 
email@email.com</div>
  </div>
)

export default Cards;