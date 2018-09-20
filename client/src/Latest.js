import React, { Component } from 'react'

class Latest extends Component {
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
    fetch('/api/latest')
      .then(res => res.json())
      .then(commands => this.setState({ commands }))
  }

  render() {
    return (
      <div className="column is-narrow">
        <p className="subtitle">
          Latest:
          {this.state.commands.map((command, index) => (
            <span className={index}>
              {" '" + command.command_name + "'"} by {command.user}
            </span>
          ))}
        </p>
      </div>
    )
  }
}

export default Lastest
