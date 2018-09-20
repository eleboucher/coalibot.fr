import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Lastest from './Latest'
import Stat from './Stat'

ReactDOM.render(<App />, document.getElementById('app'))
ReactDOM.render(<Latest />, document.getElementById('lastest'))
ReactDOM.render(<Stat />, document.getElementById('nbuser'))
