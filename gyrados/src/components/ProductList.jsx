import React, { Component } from 'react';
// Might want to wrap this in a component
import DataStore from '../models/datastore';
class ProductList extends Component {

  componentWillMount() {
    // TODO: Get products in separate product list
    this.setState({
      products: window.datastore.getProducts(),
      filters: [{}]
    })
  }

  updateFilters(filters) {
    console.log("in update")
    this.setState({
      filters: filters
    })
  }

  render() {

    console.log("Product filters " , this.state.filters)

    return (
      <ul>
        {this.state.products.map((value, key) => {
          return <li key={value.id}>{value.id}</li>
        })}
        <li>Count: {this.state.filters.length}</li>
      </ul>
    );
  }
}

export default ProductList;
