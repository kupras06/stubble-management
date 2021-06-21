import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getCurrentUser, isAuthenticated, verifyRole } from '../utils/auth'
import './user.css'
import {
  Container,
  Grid,
  Image,
  Divider,
  List,
  Dimmer,
  Loader,
  Placeholder,
} from 'semantic-ui-react'
import LoginForm from '../components/Segments/LoginForm'
import FarmerUser from '../components/Segments/FarmerUser'
import BuyerUser from '../components/Segments/BuyerUser'

class UserPage extends Component {
  state = {
    user: null,
  }
  componentDidMount() {
    this.getUserDetials()
    console.log('called', isAuthenticated())
  }
  getUserDetials = async () => {
    const user = await getCurrentUser()
    this.setState({ user })
  }
  render() {
    console.log('Called')
    if (!isAuthenticated()) {
      console.log('in if', this.props.history)
      return <LoginForm />
    }
    const { user } = this.state
    return (
      <>
        {' '}
        {!this.state.user ? (
          <Dimmer>
            <Loader>Getting Your Details</Loader>
          </Dimmer>
        ) : null}
        <Container className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <Grid>
                <Grid.Column mobile={16} tablet={8} computer={5}>
                  <div className="card" style={{ padding: '1em' }}>
                    <Image
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                    />
                    <Divider />
                    <List>
                    {user ?(<>
                    {Object.keys(user).map((key,idx)=> {
                      if(key!='_id' && user[key] && key!='hashed_password' && key!='is_superuser' && key!='is_active')
                      return <List.Item>
                      <List.Header>{key.toUpperCase().replace('_',' ')} :</List.Header>{user[key]}
                    </List.Item>
                    })}                      
                    
                   
                    </>)
                    : (
                      <>
                        <Placeholder>
                          <Placeholder.Line length="full" />
                          <Placeholder.Line length="very long" />
                          <Placeholder.Line length="long" />
                          <Placeholder.Line length="medium" />
                          <Placeholder.Line length="short" />
                          <Placeholder.Line length="very short" />
                        </Placeholder>
                      </>
                    )}
                      
                    </List>
                  </div>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={11}>
                  <div className="card" style={{ padding: '1em' }}>
                    <h1>Other Details</h1>
                    {this.state.user?.ROLE == 'FARMER' ? (
                      <FarmerUser user_id={this.state.user.user_id} />
                    ) : this.state.user?.ROLE == 'BUYER' ? (
                      <BuyerUser />
                    ) : (
                      <>
                        <h4>Fetching...</h4>
                        <Placeholder>
                          <Placeholder.Line length="full" />
                          <Placeholder.Line length="very long" />
                          <Placeholder.Line length="long" />
                          <Placeholder.Line length="medium" />
                          <Placeholder.Line length="short" />
                          <Placeholder.Line length="very short" />
                        </Placeholder>
                      </>
                    )}
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </Container>
      </>
    )
  }
}

export default withRouter(UserPage)
