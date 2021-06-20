import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Divider,
  Grid,
  Image,
  Segment,
  Header,
  Icon,
  Button,
  Search,
} from 'semantic-ui-react'
import UserTypeSegment from '../Segments/UserTypeSegment'
export default class HomePageLayout extends Component {
  render() {
    return (
      <>
        <Segment placeholder inverted>
          <Grid columns={2} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header inverted text>
                  Are an agriculturist or have acces to a lot of stubble,, then
                  go on explore the possibilites
                </Header>
                <Button primary as={Link} to="/sign-up">
                  Sign Up Now
                </Button>
              </Grid.Column>
              <Divider inverted vertical>
                Or
              </Divider>
             
              <Grid.Column>
                <Header inverted text>
                  Are you in need of stubble, then sign up now and explore the
                  available resources or checkout as guest
                </Header>

                <Button primary  as={Link} to="/stubbles">Get Started</Button>
              </Grid.Column>
            
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    )
  }
}
