import React, { Component } from 'react'
import { Segment, Card } from 'semantic-ui-react'
export default class UserTypeSegment extends Component {
  render() {
    return (
      <Segment {...this.props} placeholder>
        {this.props.children}
      </Segment>
    )
  }
}
