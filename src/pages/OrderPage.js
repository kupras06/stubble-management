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
  state = { loading: true, stubble: {}, qty: 1, amount: 1, confirm: false }
  constructor(props) {
    super(props)
  }
  open = () => {
    if (this.state.qty > 5 && this.state.amount > 500 )
    this.setState({ confirm: true ,error:null})
    else 
    this.setState({error : 'Invalid Quantity or Price'})
  }
  close = () => this.setState({ confirm: false })
  placeOrder = () => {
    console.log('confirmed')
  }
  componentDidMount() {
    this.getStubbles()
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
              onChange={(e) => {
                this.setState({
                  amount: e.target.value,
                  qty: e.target.value / this.state.stubble?.price,
                })
                console.log(this.state.qty)
              }}
              value={this.state.amount}
              error={this.state.amount < 100 ? true : false}
            >
              <Label color="teal">Price</Label>
              <input />
            </Input>

            <Input
              style={buttons}
              label
              placeholder="Enter Weight"
              value={this.state.qty}
              onChange={(e) => {
                this.setState({
                  qty: e.target.value,
                  total: e.target.value * this.state.stubble?.price,
                  amount: e.target.value * this.state.stubble?.price,
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
          {this.state.error?<Message negative>{this.state.error}</Message>:null}
        </Segment>
      </Container>
    )
  }
}

export default withRouter(OrderPage)
