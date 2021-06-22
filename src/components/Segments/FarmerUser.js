import React, { Component } from 'react'
import FarmForm from '../../pages/FarmForm'
import { Tab } from 'semantic-ui-react'
import FarmerStubble from './FarmerStubble'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
export default class FarmerUser extends Component {
  state = {
    panes: [
      {
        menuItem: 'Edit Profile',
        render: () => (
          <Tab.Pane>
            <EditProfile user={this.props.user} refreshUser={this.props.refreshUser}/>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Stubbles',
        render: () => (
          <Tab.Pane>
            <FarmerStubble />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Add Stubble',
        render: () => (
          <Tab.Pane>
            <FarmForm />
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
    ],
  }
  render() {
    return (
      <div>
        <Tab panes={this.state.panes} />
      </div>
    )
  }
}
