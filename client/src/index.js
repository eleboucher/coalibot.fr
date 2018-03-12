import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Lastest from './Lastest'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('app'))
ReactDOM.render(<Lastest />, document.getElementById('lastest'))
//registerServiceWorker()
