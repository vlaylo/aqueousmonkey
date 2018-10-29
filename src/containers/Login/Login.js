import React, { Component } from 'react'
import classes from './Login.css'
import LoginForm from '../../components/LoginStuff/LoginForm/LoginForm';
import Fade from 'react-reveal/Fade';
import logo from '../../assets/SinFron_LogoWhite-03.png'

export default class Login extends Component {
  render() {
  
    return (
      <div className={classes.Container}>
        <div className={classes.Login}>
          <div>
            <Fade delay={2000}>
              <img src={logo} className={classes.Logo} alt="LOGO"/>
              <LoginForm/>
            </Fade>
          </div>
        </div>
      </div>
    )
  }
}
