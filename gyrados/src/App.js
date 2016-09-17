import React, { Component } from 'react';
import './styles/App.scss';
import FilterContainer from './components/FilterContainer';
import ProductList from './components/ProductList';
// Might want to wrap this in a component
import DataStore from './models/datastore';

class App extends Component {

  componentWillMount() {
    let properties = window.datastore.getProperties();
    let operators = window.datastore.getOperators();

    this.setState({
      properties: properties,
      operators: operators,
      filters: [{}]
    })
  }

  setFilters = (filters) => {
    this.refs.products.updateFilters(filters);
  }

  setProperties = (properties) => {
    this.refs.properties.up(filters);
  }

  render() {
    return (
      <div className="app">
        <FilterContainer setFilters={this.setFilters} properties={this.state.properties} operators={this.state.operators} />
        <ProductList filters={this.state.filters} ref="products" properties={this.state.properties} operators={this.state.operators} />
      </div>
    );
  }
}

export default App;
