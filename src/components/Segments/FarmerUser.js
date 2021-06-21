import React, { Component } from 'react'
import FarmForm from '../../pages/FarmForm'
import { Tab } from 'semantic-ui-react'

const panes = [
    {
      menuItem: 'Edit Profile',
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: 'Stubbles',
      render: () => (
        <Tab.Pane>
            FETCHING STUBBLES LIST
        </Tab.Pane>
      ),
    },{
        menuItem: 'Add Stubble',
        render: () => (
          <Tab.Pane>
              <FarmForm />
          </Tab.Pane>
        ),
      },
  ]
  
export default class FarmerUser extends Component {
    render() {
        return (
            <div>
                <Tab panes={panes} />
            </div>
        )
    }
}
