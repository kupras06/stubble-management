import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import BookingsTable from './BookingsTable'

const panes = [
    {
      menuItem: 'Edit Profile',
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: 'Bookings',
      render: () => (
        <Tab.Pane>
           <BookingsTable />
        </Tab.Pane>
      ),
    }  ]
  
export default class BuyerUser extends Component {
    render() {
        return (
            <div>
                <Tab panes={panes} />
            </div>
        )
    }
}
