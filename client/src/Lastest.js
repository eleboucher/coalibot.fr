import React, { Component } from 'react'

class Lastest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commands: []
    }
  }
  componentDidMount() {
    this.fetchData()
    this.timerID = setInterval(() => this.fetchData(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  fetchData() {
    fetch('/api/lastest')
      .then(res => res.json())
      .then(commands => this.setState({ commands }))
  }

  render() {
    return (
      <div>
        <h1 className="title">Lastest</h1>
        <h2>
          {this.state.commands.map(command => (
            <div>
              {"'" + command.command_name + "'"} by {command.user}
            </div>
          ))}
        </h2>
      </div>
    )
  }
}

export default Lastest
