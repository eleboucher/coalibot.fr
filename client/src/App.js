import React, { Component } from 'react';
import User from './User';
import Command from './Command';
import Lastest from './Lastest';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <User />
        <Command />
        <Lastest />
      </div>
    );
  }
}

export default App;
