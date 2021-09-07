import React from 'react'
import ReactDOM from 'react-dom'
import WeatherApp from './components/WeatherApp'
import * as serviceWorker from './serviceWorker'

import './styles/style.css'

function App() {
  return <WeatherApp />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

serviceWorker.register()
