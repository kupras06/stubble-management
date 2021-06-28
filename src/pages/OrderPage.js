import React, { Component } from 'react'
import {
  Grid,
  Button,
  Container,
  Divider,
  Placeholder,
  Item,
  Label,
  Input,
  Segment,
  ItemExtra,
  Dimmer,
  Loader,
  Confirm,
  Message,
  Header,
  Icon
} from 'semantic-ui-react'
import { API_URL } from '../config'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../UserContext'

class OrderPage extends Component {
  static contextType = UserContext
  state = {
    loading: true,
    stubble: {},
    qty: 1,
    amount: 1,
    confirm: false,
    error: null,
    user: null,
  }
  validate = () => {
    if (isNaN(this.state.qty) || isNaN(this.state.amount)) {
      // console.log('in NAN')
      this.setState({ qty: 1, amount: this.state.stubble.price })
    }
    if (
      (this.state.qty > this.state.stubble.quantity ||
        this.state.qty < 0 ||
        this.state.amount < 0) &&
      !this.state.error
    ) {
      // console.log('in if')
      this.setState({ error: 'Invalid Quantity or Price' })
    } else return true
  }
  open = () => {
    if (this.validate()) this.setState({ confirm: true, error: null })
  }
  close = () => this.setState({ confirm: false })

  placeOrder = async () => {
    console.log('confirmed', this.state)
    this.setState({ confirm: false, pageLoading: true })
    const orderData = {
      user_id: this.state.user._id,
      stubble_id: this.state.stubble._id,
      quantity: this.state.qty,
      amount : this.state.amount
    }
    const token = localStorage.getItem('token')
    console.log(orderData)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    await axios
      .post(`${API_URL}users/order`, orderData)
      .then((res) => {
        console.log(res)
        this.setState({orderSuccess:true})
      })
      .catch((e) => console.log('err', e))

    this.setState({ pageLoading: false })
  }
  componentDidMount() {
    this.fetchDetails()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.validate()
  }
  fetchDetails = async () => {
    const { id } = this.props.match.params
    // console.log(id)
    const token = localStorage.getItem('token')
    const request = new Request(`${API_URL}stubble/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': ' http://127.0.0.1:3000',
      },
      data: {
        id,
      },
    })

    const response = await fetch(request)

    const data = await response.json()
    const { user }= this.context
    this.setState({ stubble: data, loading: false, amount: data.price, user })
  }

  render() {
    const buttons = {
      margin: '1em',
    }
    const { loading } = this.state

    return (
         <Dimmer.Dimmable as={Container} dimmed={this.state.orderSuccess}>
         

          <Dimmer active={this.state.orderSuccess} onClickOutside={() => this.setState({orderSuccess:false})}>
            <Header as='h2' icon inverted>
              <Icon name='check' />
             Order Placed SuccessFully
            </Header>
            <div>
            <Button onClick={() => this.setState({orderSuccess:false}) } >Okay</Button>
            </div>
          </Dimmer>

       
        {this.state.pageLoading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null}
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <Item.Image src={this.state.stubble?.image_url} />
              )}
            </Grid.Column>
            <Grid.Column>
              {loading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line length="very short" />
                    <Placeholder.Line length="long" />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                <Item.Content>
                  <Item.Header as="h1">{this.state.stubble?.name}</Item.Header>
                  <Item.Meta>
                    <span> Type : {this.state.stubble?.type}</span>
                  </Item.Meta>
                  <Item.Description>
                    {this.state.stubble?.description} So, what do you think
                  </Item.Description>
                </Item.Content>
              )}

              <ItemExtra as="h3">
                Available quantity : {this.state.stubble?.quantity}
              </ItemExtra>

              <ItemExtra as="h3">Price : {this.state.stubble?.price}</ItemExtra>
            </Grid.Column>
          </Grid>

          <Divider vertical />
        </Segment>
        <Segment>
          <div style={{ padding: '1em' }}>
            <Input
              label
              style={buttons}
              placeholder="Enter Price"
              type="number"
              onChange={(e) => {
                const value = Number.parseFloat(e.target.value || '1')
                this.setState({
                  error: null,
                  amount: value,
                  qty: value / this.state.stubble?.price,
                })
              }}
              value={this.state.amount}
              error={
                this.state.amount < this.state.stubble.price ? true : false
              }
            >
              <Label color="teal">Price</Label>
              <input type="number" />
            </Input>

            <Input
              style={buttons}
              label
              placeholder="Enter Weight"
              value={this.state.qty}
              onChange={(e) => {
                const value = Number.parseFloat(e.target.value ?? '1')
                // console.log(value)
                this.setState({
                  error: null,
                  qty: value,
                  total: value * this.state.stubble?.price,
                  amount: value * this.state.stubble?.price,
                })
              }}
              error={this.state.qty < 1 ? true : false}
            >
              <Label color="teal">Weight (Kg)</Label>
              <input />
            </Input>
            <Button onClick={this.open}>Place Order</Button>
            <Confirm
              open={this.state.confirm}
              onCancel={this.close}
              onConfirm={this.placeOrder}
            />
          </div>
          {this.state.error ? (
            <Message negative>{this.state.error}</Message>
          ) : (
            <Message info>Note : Minimum Value are Displayed initially</Message>
          )}
        </Segment>
        </Dimmer.Dimmable>

    )
  }
}

export default withRouter(OrderPage)
