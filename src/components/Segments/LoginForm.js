import React, { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/cjs/react-dom-test-utils.production.min'
import { Link , Redirect} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'
import { isAuthenticated, login, logout } from '../../utils/auth'

import { useHistory } from "react-router-dom";
export default class LoginForm extends Component {
  state = {
    formData: {},
    login:false,
  }
  handleChange = (e, { value }) => {
    const data = this.state.formData
    data[e.target.name] = value
    this.setState({ formData: { ...data } })
  }
  validate = () => {
    const { email, password } = this.state.formData
    const re = /\S+@\S+\.\S+/
    if (!re.test(email) || !password) return false
    return true
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    if (this.validate()) login(this.state.formData)
    this.setState({login : true})
    console.log(this.props)
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >{isAuthenticated ? 'AUTHORIZED' : 'UNAUTHORIZED'}
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            WelCome Again
          </Header>
          <Form size="large" onSubmit={this.handleFormSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                required
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                required
                onChange={this.handleChange}
              />
              <button
                className="ui large teal button"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Login
              </button>
            </Segment>
          </Form>
          {/* <Message>
            New here? <Link to="/sign-up">Sign Up</Link>
          </Message> */}
        
        </Grid.Column>
        {this.state.login ? <Redirect to="/stubbles" />:null}
        {console.log(this.state)}
      </Grid>
    )
  }
}
