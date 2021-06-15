import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import NavBar from './components/NavBar'
import LoginForm from './components/Segments/LoginForm'
import RegisterForm from './components/Segments/RegisterForm'

function Routes() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact>
          <RegisterForm />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  )
}

export default Routes
