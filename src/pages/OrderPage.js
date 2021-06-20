import React, { Component } from 'react'
import {
  Grid,
  Image,
  Button,
  Card,
  Container,
  Divider,
  Placeholder,
  Item,
  Label,
  Input,
  Segment,
  ItemExtra,
  TextArea,
  Header,
  Confirm,
  Message,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import { withRouter } from 'react-router-dom'

class OrderPage extends Component {
  state = { loading: true, stubble: {}, qty: 1, amount: 1, confirm: false,error:null }
  constructor(props) {
    super(props)
  }
  validate = () => {
    if (this.state.qty > this.state.stubble.quantity || this.state.qty < 0 || this.state.amount < 0){
      console.log('in if')
      this.setState({ error: 'Invalid Quantity or Price', qty: 1 })
    }
    else return true
  }
  open = () => {
    if (this.validate())  this.setState({ confirm: true, error: null })
  }
  close = () => this.setState({ confirm: false })
  placeOrder = () => {
    console.log('confirmed')
  }
  componentDidMount() {
    this.getStubbles()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Updated',prevProps, prevState, snapshot,this.state)
    
  }
  getStubbles = async () => {
    const { id } = this.props.match.params
    console.log(id)
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
    console.log(data)
    this.setState({ stubble: data, loading: false, amount: data.price })
  }

  render() {
    const buttons = {
      margin: '1em',
    }
    const { loading } = this.state

    return (
      <Container>
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
                <Item.Content centered>
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
              type='number'
              onChange={(e) => {
                const value = Number.parseFloat(e.target.value || '1')
                this.setState({
                  error: null,
                  amount: value,
                  qty: value/ this.state.stubble?.price,
                })
              }}
              value={this.state.amount}
              error={this.state.amount < 100 ? true : false}
              defaultValue={1}
            >
              <Label color="teal">Price</Label>
              <input type="number"/>
            </Input>

            <Input
              style={buttons}
              label
              placeholder="Enter Weight"
              value={this.state.qty}
              onChange={(e) => {
                  const value = Number.parseFloat(e.target.value ?? '1')
                  console.log(value)
                  this.setState({
                    error: null,
                    qty: value,
                    total: value * this.state.stubble?.price,
                    amount: value * this.state.stubble?.price,
                  })
                
              }}
              error={this.state.qty < 10 ? true : false}
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
          ) : null}
        </Segment>
      </Container>
    )
  }
}

export default withRouter(OrderPage)
