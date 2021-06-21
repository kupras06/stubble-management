import React, { Component } from 'react'
import {  withRouter,Link, Redirect } from 'react-router-dom'
import { getCurrentUser, isAuthenticated, verifyRole } from '../utils/auth'
import './user.css'
import { Container, Grid, Image, Divider, Tab,Button } from 'semantic-ui-react'
import LoginForm from '../components/Segments/LoginForm'
import BookingsTable from '../components/Segments/BookingsTable'
import FarmForm from './FarmForm'
import FarmerUser from '../components/Segments/FarmerUser'
import BuyerUser from '../components/Segments/BuyerUser'


class UserPage extends Component {
  state = {
    user:null
  }
  componentDidMount() {
      this.getUserDetials()
    console.log('called', isAuthenticated())
  }
  getUserDetials = async () => {
    const user = await getCurrentUser()
    this.setState({user})
  }
  render() {
    console.log('Called')
    if (!isAuthenticated()) {
      console.log('in if', this.props.history)
      return <LoginForm />
    }
    console.log('in logihfhfh')
    return (
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
                  <h1>User Details</h1>
                  <h5>Account Type : {this.state.user?.ROLE}</h5>
                  {this.state.user?.ROLE=='FARMER' ? <Button onClick={() => <FarmForm />} >Add Stubble</Button> : null}
                </div>
              </Grid.Column>

              <Grid.Column mobile={16} tablet={8} computer={11}>
                <div className="card" style={{ padding: '1em' }}>
                  <h1>Other Details</h1>
                  {this.state.user?.ROLE=='FARMER'?<FarmerUser user_id={this.state.user.user_id}/> : this.state.user?.ROLE=='BUYER'?<BuyerUser />:<h1>WHO ARE YOU?</h1>}
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </Container>
    )
  }
}

export default withRouter(UserPage)
