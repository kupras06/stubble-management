import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './UserContext'
ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
