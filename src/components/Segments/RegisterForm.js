import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react'
import { signup } from '../../utils/auth'
export default class RegisterForm extends Component {
  state = {
    formData: {
      ROLE : 'farmer'
    },
    error:null,
  }
  handleChange = (e,{ value}) => {
      const data = this.state.formData
      data[e.target.name] = value
      this.setState({formData : { ...data }})
  }
  validate = () => {
    const { email, password, password2 } = this.state.formData
    const re = /\S+@\S+\.\S+/;
    if(!re.test(email) || !password || password!==password2){
      this.setState({error:'Incorrect Data'})
      return false
    }
    return true
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    if (this.validate())
    signup(this.state.formData,this.props.role)
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '80vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            WelCome, Lets Get Started!
          </Header>
          <Form size="large" onSubmit={this.handleFormSubmit}>
            <Segment stacked>
            <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="first_name"
                type="first_name"
                name="first_name"
                required
                onChange={this.handleChange}
              /><Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="last_name"
              type="last_name"
              name="last_name"
              required
              onChange={this.handleChange}
            />
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
              
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                required
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
              {this.state.error ?  <Message negative>
            {this.state.error}
          </Message>:<Message info>Note : You Are Signing Up as <b>{this.props.role}</b> <br/> If You don't want this go back </Message>}
            </Segment>
           
          </Form>
          <Message>
            Already registered? <Link to="/login">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
