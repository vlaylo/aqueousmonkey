import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import classes from './LoginForm.css';
require('../../../login.php')


export default class LoginForm extends Component {

    state={
        username: '',
        password: '',
    }

    onChange=(e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state)
    }

    loginHandler = (e) => {
        e.preventDefault();

        const {username, password} = this.state
        fetch('http://localhost:5000/login', {
            method: "post",
            body: {
                "username": username,
                "password": password,
            }
        })
        .then(result => console.log(result))
    }
  render() {
      const {username, password} = this.state;
    return (
        <div className={classes.LoginForm}>
            <form method="post" action='/login' onSubmit={this.none}> 
                <input className={classes.Info} type='text' name='username' placeholder="Login" required/><br/><br/>
                <input className={classes.Info} type='password' name="password" placeholder="Password" required/><br/><br/>
                <input className={classes.Submit} type="submit" value="LOGIN"/>
            </form>
        </div>
    )   
  }
}



/*const LoginForm = () => (
   <div className={classes.LoginForm}>
        <form method="get" method="get"> 
            <input className={classes.Info} type='text' name='username' placeholder="Login" required/><br/><br/>
            <input className={classes.Info} type='password' name='password' placeholder="Password" required/><br/><br/>
            <NavLink to='/home'><input className={classes.Submit} type="submit" value="LOGIN"/></NavLink>
        </form>
    </div>
)

export default LoginForm;*/
