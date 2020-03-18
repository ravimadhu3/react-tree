import React from 'react';
import './App.css';

import { MDBDataTable } from 'mdbreact';
class DatatablePage extends React.Component {

  render() {
    return (
        <MDBDataTable
            striped
            bordered
            hover
            data={this.props.data}
        />
    )
  }
}

export default DatatablePage;
