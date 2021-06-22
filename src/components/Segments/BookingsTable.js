import React, { Component } from 'react'
import { Placeholder } from 'semantic-ui-react'
import { API_URL } from '../../config'
import Table from '../Layouts/Table'
export default class BookingsTable extends Component {
  state = {
    orders: null,
    mount: true,
  }
  componentDidMount() {
    this.getBookingsDetails()
  }
  getBookingsDetails = async () => {
    const token = localStorage.getItem('token')
    const request = new Request(API_URL + 'orders/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    const response = await fetch(request)

    const data = await response.json()
    console.log(data)
    if (this.state.mount) this.setState({ orders: data })
  }
  componentWillUnmount() {
    this.mount = false
  }
  render() {
    const columns = [
      { accessor: '_id', Header: 'ID' },
      { accessor: 'quantity', Header: 'Quantity' },
      { accessor: 'amount', Header: 'Total Cost' },
      { accessor: 'order_date', Header: 'Order Date' },
    ]
    return (
      <>
        {this.state.orders ? (
          <div>
            <Table data={this.state.orders} columns={columns} />
          </div>
        ) : (
          <Placeholder fluid>
            <Placeholder.Image />
          </Placeholder>
        )}
      </>
    )
  }
}
