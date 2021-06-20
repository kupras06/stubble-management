import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Divider,
  Grid,
  Segment,
  Header,
  Button,
} from 'semantic-ui-react'
export default class HomePageLayout extends Component {
  render() {
    return (
      <>
        <Segment placeholder inverted>
          <Grid columns={2} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header inverted>
                  Are an agriculturist or have acces to a lot of stubble,, then
                  go on explore the possibilites
                </Header>
                <Button primary as={Link} to="/farmer/sign-up">
                  Sign Up Now
                </Button>
              </Grid.Column>
              <Divider inverted vertical>
                Or
              </Divider>
             
              <Grid.Column>
                <Header inverted >
                  Are you in need of stubble, then sign up now and explore the
                  available resources or checkout as guest
                </Header>

                <Button primary  as={Link} to="buyer/sign-up">Get Started</Button>
              </Grid.Column>
            
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    )
  }
}
