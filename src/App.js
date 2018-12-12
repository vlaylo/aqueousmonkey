import React, { Component } from 'react';
import classes from './App.css';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Voters from './containers/Voters/Voters';
import {Route, Switch} from 'react-router-dom'
import Reports from './containers/Reports/Reports';
import TopBar from './components/TopBar/TopBar';
import Aux from './auxilliary'
import BottomBar from './components/BottomBar/BottomBar';



class App extends Component {

  state={
    response: ''
  }

  render() {
    return (
          <div className={classes.App}>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/home' component={Home}/>
                  <div>
                  <Route path='/voters' component={Voters}/>
                  <Route path='/reports' component={Reports}/>
                  <BottomBar/>
                </div>
            </Switch>
          </div>
    )

  }
}

export default App;

//LOGIN
    /*return (
      <div className="classes.App">
        <Login/>
      </div>
    );*/