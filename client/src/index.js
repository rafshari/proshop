import React from 'react'
import ReactDOM from 'react-dom/client'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import './fonts/IRANSansWeb(FaNum).ttf'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
