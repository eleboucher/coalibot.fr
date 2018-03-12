import React, { Component } from 'react'
import User from './User'
import Command from './Command'
import Day from './Day'
class App extends Component {
  render() {
    return (
      <div className="container">
        <User />
        <Command />
        <Day />
      </div>
    )
  }
}

export default App
