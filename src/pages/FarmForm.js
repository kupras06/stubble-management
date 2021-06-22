import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import axios from 'axios'
import { API_URL } from '../config'
export default class FarmForm extends Component {
  state = {
    open: true,
    file: null,
    type: '',
    name: '',
    price: '',
    quantity: '',
    errors: {},
    loading: false,
    error: false,
    data:''
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] })
  }

  onFileSubmit = async (e) => {
    this.setState({ file: e.target.files[0] })
    console.log(this.state.file)
  }
  validate = () => {
    const { name, price, type, quantity } = this.state
    const errors = {}
    if (!name || name == '') errors['name'] = 'Name is Required'
    if (!price || price == '') errors['price'] = 'Price is Required'
    if (!type || type == '') errors['type'] = 'Type is Required'
    if (!quantity || quantity == '') errors['quantity'] = 'Quantity is Required'
    if (!this.state.file) errors['file'] = 'Image is Required'
    this.setState({ errors })
    return this.state.errors ? false : true
  }
  formSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    if (this.validate()) {
      const token = localStorage.getItem('token')
      var formData = new FormData()
      formData.append('file', this.state.file, this.state.file.name)
      const headers = {
        'Content-Type': this.state.file.type,
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
      let request = new Request(API_URL + 'stubble/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body:formData,
      })
      let response = await fetch(request).catch((err) => {
        console.log(err)
        this.setState({ loading: false })
      })
      const url = await response.json()
      console.log(url)
      let data1 = '';
      if (url) {
        const body1 = {
          name: this.state.name,
          type: this.state.type,
          price: this.state.price,
          quantity: this.state.quantity,
          owner: this.props.user_id,
          image_url: url,
        }
        request = new Request(API_URL + 'stubble', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body:JSON.stringify(body1),
        })
        let response = await fetch(request).catch((err) => {
          console.log(err)
          this.setState({ loading: false })
        })
      }
      this.setState({ name: '', type: '', price: '', quantity: '', file: null })
      console.log('response data', this.state.data)
    }

    this.setState({ loading: false })
  }
  render() {
    return (
      <>
        <Form onSubmit={this.formSubmit} loading={this.state.loading}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Type</label>
              <Form.Input
                fluid
                placeholder="Type"
                value={this.state.type}
                error={this.state.errors?.type}
                message={
                  this.state.errors?.type ? this.state.errors.type : null
                }
                onChange={(e) =>
                  this.setState({ type: e.target.value, errors: false })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Stubble name</label>
              <Form.Input
                fluid
                value={this.state.name}
                placeholder="Stubble name"
                error={this.state.errors?.name}
                onChange={(e) =>
                  this.setState({ name: e.target.value, errors: false })
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Price Per Unit</label>
              <Form.Input
                error={this.state.errors?.price}
                fluid
                value={this.state.price}
                placeholder="Price"
                onChange={(e) =>
                  this.setState({ price: e.target.value, errors: false })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Available Quantity</label>
              <Form.Input
                fluid
                value={this.state.quantity}
                error={this.state.errors?.quantity}
                placeholder="Quantity"
                onChange={(e) =>
                  this.setState({ quantity: e.target.value, errors: false })
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <Button
                as="label"
                htmlFor="file"
                type="button"
                style={{ width: 'fit-content' }}
                color={this.state.file?.name ? 'olive' : 'teal'}
                error={this.state.errors.quantity}
              >
                {this.state.file?.name || 'Choose File'}
              </Button>

              <input
                type="file"
                id="file"
                accept="image/png, image/gif, image/jpeg"
                style={{ display: 'none' }}
                onChange={this.onFileSubmit}
              />
            </Form.Field>

            <Button type="submit" color="blue">
              Submit
            </Button>
          </Form.Group>
        </Form>
        {this.state.errors?.file ? (
          <Message error>{this.state.errors?.file}</Message>
        ) : null}
        {this.state.error ? <Message error>{this.state.error}</Message> : null}
      </>
    )
  }
}
