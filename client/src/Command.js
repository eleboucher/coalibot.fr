import { Bar } from 'react-chartjs-2'
import React, { Component } from 'react'

class Command extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    this.fetchData()
    this.timerID = setInterval(() => this.fetchData(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  chartData(json) {
    var labels = json.map(function(e) {
      return e.command_name
    })
    var data = json.map(function(e) {
      return e.count
    })
    return {
      labels: labels,
      datasets: [
        {
          label: 'Commands',
          data: data,
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850']
        }
      ]
    }
  }

  fetchData() {
    fetch('/api/commands')
      .then(res => res.json())
      .then(json => this.chartData(json))
      .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div>
        <h1 className="title">Command</h1>
        <Bar data={this.state.users} />
      </div>
    )
  }
}

export default Command
