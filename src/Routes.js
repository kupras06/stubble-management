import React, { useContext, createContext, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import OrderPage from './pages/OrderPage'
import NavBar from './components/NavBar'
import LoginForm from './components/Segments/LoginForm'
import RegisterForm from './components/Segments/RegisterForm'
import StubbleList from './pages/StubbleList'
import FarmForm from './pages/FarmForm'
import { logout } from './utils/auth'
import { verifyRole } from './utils/auth'
import UserPage from './pages/UserPage'
export default function Routes(props) {
  return (
    <Router>
      <div>
        <NavBar />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <LoginForm />
          </Route>
          <Route path="/farmer/sign-up" exact>
            <RegisterForm role="FARMER" />
          </Route>
          <Route path="/buyer/sign-up" exact>
            <RegisterForm role="BUYER" />
          </Route>
          <Route
            path="/stubbles"
            exact
            {...props}
            render={(props) =>
              verifyRole('BUYER') ? (
                <StubbleList {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: {
                      message:
                        'You need to Login With your Buyer Account First',
                      to: '/stubbles',
                    },
                  }}
                ></Redirect>
              )
            }
          />

          <Route path="/stubble/:id" exact>
            <OrderPage />
          </Route>
          <Router
            path="/add-stubble"
            exact
            {...props}
            render={(props) =>
              verifyRole('FARMER') ? (
                <FarmForm {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: {
                      message:
                        'You need to Login With your Farmer Account First',
                    },
                  }}
                />
              )
            }
          />
          <Router path="/user" exact>
            <UserPage />
          </Router>
          <Route path="/logout" render={() => logout()} exact />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
