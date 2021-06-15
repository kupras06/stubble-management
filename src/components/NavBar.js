import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

export default class MenuExampleInverted extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Container>
          <Menu.Item header>Stubbler</Menu.Item>
          <Menu.Item
            name="home"
            icon="home"
            as={Link}
            to="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link}
            to="/about-us"
            name="aboutUs"
            active={activeItem === 'aboutUs'}
            onClick={this.handleItemClick}
          />
           <Menu.Item
            as={Link}
            icon="sign-in"
            to="/login"
            name="log-in"
            active={activeItem === 'aboutUs'}
            onClick={this.handleItemClick}
          />
        </Container>
      </Menu>
    )
  }
}
