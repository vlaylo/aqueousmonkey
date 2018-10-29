import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

import Fade from 'react-reveal/Fade';
import classes from './Home.css'
import TopBar from '../../components/TopBar/TopBar';
import Cards from '../../components/HomePageStuff/Cards/Cards';

const style = {
  textDecoration: 'none'
}
export default class Home extends Component {
  render() {
    return (
      <div className={classes.Home}>
        <Fade>
          <Cards/>
        </Fade>
      </div>
    )
  }
}
