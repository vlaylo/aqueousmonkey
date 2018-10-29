import React, { Component } from 'react';

import classes from './Voters.css'
import VotersCards from '../../components/VotersStuff/VotersCards';

export default class Voters extends Component {

  state = {
    searched: false,
  }
  render() {
    const {searched} = this.state;

    if (!searched) {
      return (
        <div>
          <VotersCards/>
        </div>
      );
    } else if (searched) {
      return (
        <div>
          HELLO
        </div>
      )
    }
  }
}
