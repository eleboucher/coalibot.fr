import { Line } from 'react-chartjs-2'
import React, { Component } from 'react'
import { moment } from 'moment'
class Day extends Component {
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
      return moment(e.day).format('dddd')
    })
    var data = json.map(function(e) {
      return e.count
    })
    return {
      labels: labels,
      datasets: [
        {
          label: 'Day',
          data: data,
          backgroundColor: 'rgba(0, 155, 255, 0.2)',
          fill: true
        }
      ],
      options: { yAxes: [{ ticks: { min: 0, beginAtZero: true } }] }
    }
  }

  fetchData() {
    fetch('/api/days')
      .then(res => res.json())
      .then(res => {
        res.sort(function(a, b) {
          return a.day.localeCompare(b.day)
        })
        return res
      })
      .then(json => this.chartData(json))
      .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Day</h1>
        <Line data={this.state.users} />
      </div>
    )
  }
}

export default Day
