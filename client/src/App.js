import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.fetchData(), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  fetchData() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
  }
  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user => (
          <div>
            {user.user} {user.count}
          </div>
        ))}
      </div>
    )
  }
}

export default App
