import React, { useContext, createContext, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
import { logout } from './utils/auth'
import { verifyRole } from './utils/auth'
export default function Routes(props) {
  return (
    <ProvideAuth>
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
                  <Redirect to="/login"></Redirect>
                )
              }
            />

            <Route path="/stubble/:id" exact>
              <OrderPage />
            </Route>

            <Route path="/logout" render={() => logout()} exact />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

const authContext = createContext()

function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useAuth() {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser('user')
      cb()
    })
  }

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    signin,
    signout,
  }
}

function AuthButton() {
  let history = useHistory()
  let auth = useAuth()

  return auth.user ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth.signout(() => history.push('/'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function LoginPage() {
  let history = useHistory()
  let location = useLocation()
  let auth = useAuth()

  let { from } = location.state || { from: { pathname: '/' } }
  let login = () => {
    auth.signin(() => {
      history.replace(from)
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}
