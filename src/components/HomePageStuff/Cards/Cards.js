import React from 'react';
import {NavLink} from 'react-router-dom'
import MagnifyLogo from '../../../assets/sinfronmagnify.svg'


import classes from './Cards.css'

const Cards = (props) => (
  <div className={classes.Cards}>
    <NavLink to='/voters' className={classes.Card}>
      <span className={classes.Lookup}>VOTER LOOKUP</span>
      <img src={MagnifyLogo} className={classes.Logo} />
    </NavLink>
    <NavLink to='/reports' className={classes.Card}>
      <span className={classes.Precinct}>WALK PRECINCT</span>
      <img src={MagnifyLogo} className={classes.Logo} />
    </NavLink>    
    <div className={classes.Calls}>MAKE CALLS</div>
    <div className={classes.Logout}>LOGOUT</div>
  </div>
    )

export default Cards;