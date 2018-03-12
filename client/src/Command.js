import { Radar } from 'react-chartjs-2'
import React, { Component } from 'react'

class Command extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: {}
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
          backgroundColor: 'rgba(0, 155, 255, 0.2)',
          borderColor: 'rgba(0, 155, 255, 1)',
          pointBackgroundColor: 'rgb(62, 149, 205)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)'
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
      <div className="container">
        <h1 className="title">Command</h1>
        <Radar data={this.state.users} />
      </div>
    )
  }
}

export default Command
