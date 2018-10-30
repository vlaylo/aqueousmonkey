import React, { Component } from 'react';
import classes from './App.css';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Voters from './containers/Voters/Voters';
import {Route, Switch} from 'react-router-dom'
import Reports from './containers/Reports/Reports';
import TopBar from './components/TopBar/TopBar';
import Aux from './auxilliary'


class App extends Component {

  state={
    response: ''
  }

  render() {
    return (
        <Aux>
          <TopBar/>
          <div className={classes.App}>
            <Switch>
              <Route exact path='/' component={Login}/>
                <div>
                  <Route path='/home' component={Home}/>
                  <Route path='/voters' component={Voters}/>
                  <Route path='/reports' component={Reports}/>
                </div>
            </Switch>
          </div>
        </Aux>
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