import React, { Component } from 'react'
import { Divider, Form, Button } from 'semantic-ui-react'
import { API_URL } from '../../config'
import UserContext from '../../UserContext'
export default class EditProfile extends Component {
  static contextType = UserContext
  state = {
    mount: true,
    loading: false,
    errors: {},
    user: { ...this.context.user },
  }
  handleChange = (e, { name }) => {
    console.log(e, name)
    const data = { ...this.state.user }
    data[name] = e.target.value
    console.log(data)
    this.setState({ user: data })
  }
  componentDidMount() {
    this.mounted = true
  }
  formSubmit = async (e) => {
    console.log('form Called')
    const { setUser } = this.context
    e.preventDefault()
    this.setState({ loading: true })

    const token = localStorage.getItem('token')
    const request = new Request(API_URL + 'users/me', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Contorl-Allow-Origin': 'http://127.0.0.1:3000',
      },
      body: JSON.stringify(this.state.user),
    })
    let response = await fetch(request).catch((err) => {
      console.log(err)
      this.setState({ loading: false })
    })
    const data = await response.json()
    console.log(data)

    this.setState({ loading: false })
    setUser()
  }
  componentWillUnmount() {
    this.mount = false
  }
  render() {
    console.log(this.state)
    return (
      <Form loading={this.state.loading} onSubmit={this.formSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="First Name"
              type="text"
              onChange={this.handleChange}
              name="first_name"
              value={this.state.user.first_name}
              error={this.state.errors?.first_name}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              type="text"
              label="Last Name"
              name="last_name"
              onChange={this.handleChange}
              value={this.state.user.last_name}
              error={this.state.errors?.last_name}
            ></Form.Input>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Email Address"
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.user.email}
              error={this.state.errors?.email}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              type="text"
              label="Phone Number"
              name="phone_number"
              onChange={this.handleChange}
              value={this.state.user.phone_number || ''}
              error={this.state.errors?.phone_number}
            ></Form.Input>
          </Form.Field>
        </Form.Group>
        <Divider horizontal content="Address" />
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              type="text"
              label="Address"
              name="address"
              onChange={this.handleChange}
              value={this.state.user.address || ''}
              error={this.state.errors?.address}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="City"
              type="text"
              name="city"
              onChange={this.handleChange}
              value={this.state.user.city || ''}
              error={this.state.errors?.city}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Pin Code"
              type="number"
              name="pin_code"
              onChange={this.handleChange}
              value={this.state.user.pin_code || ''}
              error={this.state.errors?.pin_code}
            ></Form.Input>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Input
              label="State"
              type="text"
              name="state"
              onChange={this.handleChange}
              value={this.state.user.state || ''}
              error={this.state.errors?.state}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Country"
              type="text"
              name="country"
              value="India"
            ></Form.Input>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Form.Button type="submit" color="blue">
            Submit
          </Form.Button>
        </Form.Field>
      </Form>
    )
  }
}
