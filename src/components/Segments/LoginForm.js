import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Modal,
  Segment,
} from 'semantic-ui-react'
import { isAuthenticated, login } from '../../utils/auth'
import { withRouter } from 'react-router'
class LoginForm extends Component {
  constructor(props) {
    super(props)
    console.log(props.location)

    this.state = {
      formData: {},
      login: false,
      isMessage: props.location.state?.message ? true : false,
      message: props.location.state?.message || null,
    }
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
  handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    if (this.validate()) {
      const user = await login(this.state.formData)
      if (isAuthenticated()) this.setState({ login: true })  
      console.log('logged in now',this.props.location,user)
    }
    
    console.log(this.props)
  }
  render() {
    console.log('logged in ? ',this.state.login)
    if (this.state.login ){
      const to = this.props.location?.state?.to || 'user'
      console.log('logged in ? ',this.state.login)
      return <Redirect to={to} />
      
    }
    return (
      <>
        <Grid
          textAlign="center"
          style={{ height: '80vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              WelCome Again
            </Header>
            {this.state.message ? (
              <Message info>{this.state.message}</Message>
            ) : null}
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
          
        </Grid>
        <Modal
          onClose={() => this.setState({ isMessage: false })}
          open={this.state.isMessage}
        >
          <Modal.Content>
            <Message info>{this.state.message}</Message>
          </Modal.Content>{' '}
          <Modal.Actions>
            <Button
              content="Okay"
              labelPosition="right"
              icon="checkmark"
              onClick={() => this.setState({ isMessage: false })}
              positive
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default withRouter(LoginForm)
