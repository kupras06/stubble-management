import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'

export default class RegisterForm extends Component {
  state = {
    formData: {},
  }
  handleChange = (e,{ value}) => {
      const data = this.state.formData
      data[e.target.name] = value
      this.setState({formData : { ...data }})
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    console.log(e)
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            WelCome
          </Header>
          <Form size="large" onSubmit={this.handleFormSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password2"
                onChange={this.handleChange}
              />
              <button
                className="ui large teal button"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Create Account
              </button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/sign-up">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
