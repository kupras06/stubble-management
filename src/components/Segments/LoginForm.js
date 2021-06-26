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
import { login } from '../../utils/auth'
import { withRouter } from 'react-router'
import UserContext from '../../UserContext'
class LoginForm extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      formData: {},
      login: false,
      isMessage: props.location.state?.message ? true : false,
      message: props.location.state?.message || null,
      error: null,
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
    const { setAuth, setUser } = this.context
    e.preventDefault()
    this.setState({ loading: true })
    // console.log(this.state.formData)
    if (this.validate())
      await login(this.state.formData)
        .then((res) => {
          setAuth(true)
          setUser(true)
        })
        .catch((err) => {
          // console.log(err)
          this.setState({ error: err, loading: false })
        })
    this.setState({ loading: false })
  }
  render() {
    const { auth } = this.context
    if (auth) {
      const to = this.props.location?.state?.to || 'user'
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
            <Form
              size="large"
              onSubmit={this.handleFormSubmit}
              loading={this.state.loading}
            >
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
            </Form>{' '}
            {this.state.error ? (
              <Message error>{this.state.error}</Message>
            ) : null}
          </Grid.Column>
        </Grid>
        <Modal
          onClose={() => this.setState({ isMessage: false })}
          open={this.state.isMessage}
        >
          <Modal.Content>
            {this.state.message ? (
              <Message info>{this.state.message}</Message>
            ) : null}
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
