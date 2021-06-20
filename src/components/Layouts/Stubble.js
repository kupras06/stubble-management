import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Grid, Card, Icon, Image, Button } from 'semantic-ui-react'
export default class Stubble extends Component {
  render() {
      const { shop } = this.props
    return (
     <>
        <Image src={shop?.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Shop Name : {shop.name}</Card.Header>
          <Card.Meta>
            <span className="date">Ratings goes here</span>
          </Card.Meta>
          <Card.Description>This holds the address</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color='blue' as={Link} to={`/stubble/${shop?.id}`}>
            Book
          </Button>
        </Card.Content>
      </>
    )
  }
}
