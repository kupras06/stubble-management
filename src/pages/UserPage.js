import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import './user.css'
import { Container, Grid, Image, Divider } from 'semantic-ui-react'

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
      this.props.history.go('/login')
      return <Redirect to="/login" />
    }
    return (
      <Container className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card" style={{ padding: '1em' }}>
              <Grid>
                <Divider vertical />
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <Image
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                  />
                </Grid.Column>

                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={8}
                  verticalAlign="middle"
                >
                  <div className="mt-3 text-center">
                    <h4>John Doe</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">
                      Bay Area, San Francisco, CA
                    </p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </Grid.Column>
              </Grid>
            </div>

            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center"></div>
            </div>
          </div>
          <div className="card mt-3" style={{ padding: '1em' }}>
            <div className="card-body">
              <Grid>
                <Divider />
                <Grid.Column mobile={16} tablet={8} computer={4}>
                  <h1>User Details</h1>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={12}>
                  <h1>User Bookings or Stubbles</h1>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withRouter(UserPage)
