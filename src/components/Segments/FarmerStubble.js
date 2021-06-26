import React, { Component } from 'react'
import { API_URL } from '../../config'
import {
  Card,
  Loader,
  Dimmer,
  Container,
  Image,
  Button,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default class FarmerStubble extends Component {
  state = {
    stubbles: null,
    loading: true,
  }
  componentDidMount() {
    this.getStubbles()
  }
  getStubbles = async () => {
    const token = localStorage.getItem('token')
    const request = new Request(`${API_URL}stubble`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })

    const response = await fetch(request)

    const data = await response.json()
    console.log(data)
    this.setState({ stubbles: data, loading: false })
  }
  render() {
    const { stubbles, loading } = this.state
    return (
      <>
        <Container style={{ minHeight: '20vh' }}>
          
          <Card.Group itemsPerRow={3} stackable>
            {stubbles
              ? stubbles.map((stubble) => (
                  <Card key={stubble?._id}>
                    <Image src={stubble?.image_url} />
                    <Card.Content>
                      <Card.Header>Name : {stubble.name}</Card.Header>
                      <Card.Meta>Type : {stubble.type}</Card.Meta>
                      <Card.Description>
                        Price : {stubble.price}
                      </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                      <Button
                        disabled={loading}
                        primary
                        as={Link}
                        to={`stubble/${stubble._id}`}
                      >
                        Edit
                      </Button>
                    </Card.Content>
                  </Card>
                ))
              : <Dimmer inverted active>
              <Loader />
            </Dimmer>}
          </Card.Group>
        </Container>
      </>
    )
  }
}
