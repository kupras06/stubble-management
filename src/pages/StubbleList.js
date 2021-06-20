import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Container,
  Divider,
  Image,
  Placeholder,
} from 'semantic-ui-react'
import { API_URL } from '../config'

export default class StubbleList extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, stubbles: [{}, {}, {}] }
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
    const { loading } = this.state

    return (
      <>
        <Container>
          <Divider />

          <Card.Group doubling itemsPerRow={3} stackable>
            {this.state.stubbles.map((stubble) => (
              <Card key={stubble?._id}>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                ) : (
                  <Image src={stubble?.image_url} />
                )}

                <Card.Content>
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="very short" />
                        <Placeholder.Line length="medium" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  ) : (
                    <>
                      <Card.Header>Name : {stubble.name}</Card.Header>
                      <Card.Meta>Type : {stubble.type}</Card.Meta>
                      <Card.Description>
                        Price : {stubble.price}
                      </Card.Description>
                    </>
                  )}
                </Card.Content>

                <Card.Content extra>
                  <Button
                    disabled={loading}
                    primary
                    as={Link}
                    to={`stubble/${stubble?._id}`}
                  >
                    Order
                  </Button>
                </Card.Content>
              </Card>
            ))}
            {/* {this.state.stubbles[0]} */}
          </Card.Group>
        </Container>
      </>
    )
  }
}
