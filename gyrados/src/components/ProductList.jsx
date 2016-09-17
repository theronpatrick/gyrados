import React, { Component } from 'react';
// Might want to wrap this in a component
import DataStore from '../models/datastore';
class ProductList extends Component {

  componentWillMount() {
    // TODO: Get products in separate product list
    this.setState({
      products: window.datastore.getProducts(),
      properties: this.props.properties,
      filters: [{}]
    })
  }

  updateFilters(filters) {
    this.setState({
      filters: filters
    })
  }

  _getPropertyNameByID(id) {
    let propertyList = this.state.properties;
    for (let i = 0; i < propertyList.length; i++) {
      if (propertyList[i].id === id) {
        return propertyList[i].name;
      }
    }
  }

  // The way the data is structured we have to loop over the array, since we can't gaurantee an id will be in its correct index.
  // Would be more efficient if both product properties and property list were returned as objects instead of arrays.
  // Could potentially be more efficient to just make that conversion on the front end
  _getProductProperties(product) {
    let propertyList = []
    for (let i = 0; i < product.properties.length; i++) {
      let id = product.properties[i].property_id;

      let propertyName = this._getPropertyNameByID(id);

      // Only return element if property name is valid (i.e. successfully returns from _getPropertyNameByID)
      if (propertyName) {
        propertyList.push(
          <div>{propertyName}: {product.properties[i].value}</div>
        )
      }


    }
    return propertyList;
  }

  render() {

    console.log("Product filters " , this.state.filters)

    return (
      <ul>
        {this.state.products.map((value, key) => {
          return <li key={value.id}>
            {this._getProductProperties(value)}
          </li>
        })}
        <li>Filters applied: {this.state.filters.length}</li>
      </ul>
    );
  }
}

export default ProductList;
