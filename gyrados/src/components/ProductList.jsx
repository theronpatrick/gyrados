import React, { Component } from 'react';
// Might want to wrap this in a component
import DataStore from '../models/datastore';
class ProductList extends Component {

  componentWillMount() {
    // TODO: Get products in separate product list
    this.setState({
      products: window.datastore.getProducts(),
      properties: this.props.properties,
      filters: []
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
  // Could potentially be more efficient to just make this conversion on the front end
  _getProductProperties(product) {
    let propertyList = []
    for (let i = 0; i < product.properties.length; i++) {
      let id = product.properties[i].property_id;

      let propertyName = this._getPropertyNameByID(id);

      // Only return element if property name is valid (i.e. successfully returns from _getPropertyNameByID)
      if (propertyName) {
        propertyList.push(
          <div><b>{this._capFirst(propertyName)}</b>: {product.properties[i].value}</div>
        )
      }


    }
    return propertyList;
  }

  _capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _productMatchesFilters(value) {

    let filters = this.state.filters;

    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i];

      let productValue = this._getProductPropertyValue(value, filter.propertyNameID);

      let matches = this._checkFilterMatch(productValue, filter.propertyValue, filter.operatorID)

      if (!matches) {
        return false;
      }

    }

    return true
  }

  _getProductPropertyValue(value, propertyID) {
    for (let i = 0; i < value.properties.length; i++) {
      if (value.properties[i].property_id === propertyID) {
        return value.properties[i].value
      }
    }

    return null;
  }

  _checkFilterMatch(productValue, filterValue, operator) {

    // In any situation, if input is blank assume the filter passes
    if (filterValue === "") {
      return true;
    }

    // TODO: Type conversions/to lower case for values


    // Otherwise check the right operation
    switch (operator) {
      case "equals":
        // Intentionally use double equals so typing "5" will match the int 5
        return productValue == filterValue
        break;
      case "greater_than":
        return productValue > filterValue
        break;
      case "less_than":
        return productValue < filterValue
        break;
      case "any":
        // Double "!" returns true if something's defined, or false if not defined or ""
        return !!productValue
        break;
      case "none":
        return !productValue
        break;
      case "in":
        let pieces = filterValue.split(" ");
        for (let i = 0; i < pieces.length; i++) {
          if (pieces[i] == productValue) {
            return true;
          }
        }
        return false
        break;
      case "contains":
        return filterValue.indexOf(productValue) > -1
        break;
      default:
        console.error("invalid operator")
        return false;
        break;

    }

  }


  render() {

    let count = 0;

    console.log("filters is " , this.state.filters)

    return (
      <ul className="product-list">
        {this.state.products.map((value, key) => {
          // For each product, run through filter check to see if we should render or not
          if (this._productMatchesFilters(value)) {
            count++;
            return <li key={value.id}>
              {this._getProductProperties(value)}
            </li>
          }
        })}
        <p>Results: {count}</p>
      </ul>
    );
  }
}

export default ProductList;
