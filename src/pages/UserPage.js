import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { getCurrentUser, isAuthenticated, verifyRole } from '../utils/auth'
import './user.css'
import { Container, Grid, Image, Divider, Tab } from 'semantic-ui-react'
import LoginForm from '../components/Segments/LoginForm'
import BookingsTable from '../components/Segments/BookingsTable'
const panes = [
  {
    menuItem: 'Edit Profile',
    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
  },
  {
    menuItem: verifyRole('FARMER') ? 'Stubbles' : 'Bookings',
    render: () => (
      <div>
        <Tab.Pane>
          <BookingsTable />
        </Tab.Pane>
      </div>
    ),
  },
]

const TabExampleBasic = () => <Tab panes={panes} />
class UserPage extends Component {
  componentDidMount() {
    //   this.getUserDetials()
    console.log('called', isAuthenticated())
  }
  getUserDetials = async () => {
    const user = await getCurrentUser()
    console.log(user)
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
                </div>
              </Grid.Column>

              <Grid.Column mobile={16} tablet={8} computer={11}>
                <div className="card" style={{ padding: '1em' }}>
                  <h1>Other Details</h1>
                  <TabExampleBasic />
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
