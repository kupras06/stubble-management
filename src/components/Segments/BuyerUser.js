import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BookingsTable from './BookingsTable'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

export default class BuyerUser extends Component {
  state = {panes : [
    {
      menuItem: 'Edit Profile',
      render: () => (
        <Tab.Pane>
          <EditProfile user={this.props.user} refreshUser={this.props.refreshUser} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Bookings',
      render: () => (
        <Tab.Pane>
          <BookingsTable />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Settings',
      render: () => (
        <Tab.Pane>
          <UpdatePassword />
        </Tab.Pane>
      ),
    },
  ]
}
  render() {
    return (
      <div>
        <Tab panes={this.state.panes} />
      </div>
    )
  }
}
