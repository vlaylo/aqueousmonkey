import React from 'react';
import {NavLink} from 'react-router-dom'


import classes from './Cards.css'

const Cards = (props) => (
  <div className={classes.Cards}>
    <div className={classes.Welcome}>LOREM</div>
    <a href="/voters" className={classes.Lookup}>VOTER LOOKUP</a>
    <a href="/reports" className={classes.Precinct}>WALK PRECINCT</a>
    <div className={classes.Calls}>MAKE CALLS</div>
    <div className={classes.Logout}>LOGOUT</div>
    <div className={classes.Questions}>Questions? Contact us at 777-777-7777 or 
email@email.com</div>
  </div>
)

export default Cards;