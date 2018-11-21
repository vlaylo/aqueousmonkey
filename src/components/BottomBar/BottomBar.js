import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import './BottomBar.css'
import MagnifyLogo from '../../../src/assets/sinfronmagnify.svg'
import {Search, PermIdentity, Dialpad, ExitToApp} from '@material-ui/icons/';



const styles = {
    root: {
      width: '100vw',
      position: 'fixed',
      bottom: '0',
      backgroundColor: '#f2f2f2',
      boxShadow: '0px 3px 5px lightgray',
    },
  };

const BottomBar = (props) => {
    const {classes} = props;    

    return (
        <BottomNavigation
            className={classes.root}
            >
        <BottomNavigationAction href="/voters" label="VOTERS" value="voters" icon={<Search style={{color: '#8F80B7', transform:'scale(1.5)'}}/>}/>
        <BottomNavigationAction href="/reports" label="REPORTS" icon={<PermIdentity style={{color: '#8F80B7', transform:'scale(1.5)'}} />}/>
        <BottomNavigationAction label="MAKE CALLS"  icon={<Dialpad style={{color: '#8F80B7', transform:'scale(1.5)'}} />}  />
        <BottomNavigationAction href ="/home" label="LOGOUT" icon={<ExitToApp style={{color: '#8F80B7', transform:'scale(1.5)'}} />} />
      </BottomNavigation>
    )
}

export default withStyles(styles)(BottomBar);