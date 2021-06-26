import React from 'react'
import { getCurrentUser } from './utils/auth'

const UserContext = React.createContext()

class UserProvider extends React.Component {
  state = {
    auth: false,
    user: null,
  }
  setAuth = (value) => {
    this.setState({ auth: value })
  }
  setUser = async (value) => {
    if(value){
    const user = await getCurrentUser()
    this.setState({ user })
    }
    else this.setState({user:null})
  }
  render() {
    const { children } = this.props
    const { auth, user } = this.state
    const { setAuth, setUser } = this

    return (
      <UserContext.Provider
        value={{
          setAuth,
          setUser,
          user,
          auth,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}
// export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer

export default UserContext
export { UserProvider }
