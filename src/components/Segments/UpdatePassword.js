import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'
import { API_URL } from '../../config'
export default class UpdatePassword extends Component {
  state = {
    loading: false,
    error: false,
  }
  formSubmit = async (e) => {
    console.log('called', e, e.target)
    const data = {}
    data[e.target[0].name] = e.target[0].value
    data[e.target[1].name] = e.target[1].value
    console.log(data)
    if (data['new_password'] === e.target[2].value) {
      this.setState({ loading: true })
      const token = localStorage.getItem('token')
      const request = new Request(API_URL + 'users/password/me', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Contorl-Allow-Origin': 'http://127.0.0.1:3000',
        },
        body: JSON.stringify(data),
      })
      let response = await fetch(request).catch((err) => {
        console.log(err)
        this.setState({ loading: false })
      })
      console.log(response)
      if (response) {
        if (response?.status === 400) {
          this.setState({ loading: false, err: response.essage })
        }
        const res = await response.json()
        if (res.message) this.setState({ message: res.message })

        this.setState({ loading: false })
      }
    } else this.setState({ error: 'New Passwords Dont Match' })
  }
  render() {
    return (
      <div>
        <Form loading={this.state.loading} onSubmit={this.formSubmit}>
          <Form.Group>
            <Form.Input
              type="password"
              name="old_password"
              label="Current Password"
              onClick={() => this.setState({ message: false, error: false })}
            ></Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input
              type="password"
              name="new_password"
              label="New Password"
              onClick={() => this.setState({ error: false, message: false })}
            ></Form.Input>
            <Form.Input
              type="password"
              name="new_password1"
              label="New Password Confirm"
              onClick={() => this.setState({ error: false, message: false })}
            ></Form.Input>
          </Form.Group>
          <Form.Button type="submit" primary>
            Update Password{' '}
          </Form.Button>
        </Form>
        {this.state.error ? <Message error>{this.state.error}</Message> : null}
        {this.state.message ? (
          <Message success>{this.state.message}</Message>
        ) : null}
      </div>
    )
  }
}
