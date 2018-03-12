import { Doughnut } from 'react-chartjs-2'
import React, { Component } from 'react'
class User extends Component {
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
      return e.user
    })
    var data = json.map(function(e) {
      return e.count
    })
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#009bff', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850']
        }
      ]
    }
  }

  fetchData() {
    fetch('/api/users')
      .then(res => res.json())
      .then(json => this.chartData(json))
      .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Users</h1>
        <Doughnut data={this.state.users} />
      </div>
    )
  }
}

export default User
