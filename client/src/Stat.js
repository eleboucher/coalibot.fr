import React, { Component } from 'react'

class Stat extends Component {
  constructor(props) {
    super(props)
    this.state = {
        nbuser: []
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
    fetch('/api/nbuser')
      .then(res => res.json())
      .then(nbuser => this.setState({ nbuser }))
  }

  render() {
    return (
      <div className="column is-narrow">
        <p className="subtitle">
          Number of total user:
          {this.state.nbuser.map((nbuser, index) => (
            <span className={index}>
              {" " + nbuser.nbuser}
            </span>
          ))}
        </p>
      </div>
    )
  }
}

export default Stat
