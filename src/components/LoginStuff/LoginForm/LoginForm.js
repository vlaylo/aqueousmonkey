import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './LoginForm.css';



const LoginForm = () => (
   <div className={classes.LoginForm}>
        <form method="get" method="get"> 
            <input className={classes.Info} type='text' name='frmLogin' placeholder="Login" required/><br/><br/>
            <input className={classes.Info} type='password' name='frmPassword' placeholder="Password" required/><br/><br/>
            <NavLink to='/home'><input className={classes.Submit} type="submit" value="LOGIN"/></NavLink>
        </form>
    </div>
)

export default LoginForm;
//            <NavLink to='/home'><input className={classes.Submit} type="submit" value="LOGIN"/></NavLink>
