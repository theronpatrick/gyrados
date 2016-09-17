import React, { Component } from 'react';
import './styles/App.scss';
import FilterContainer from './components/FilterContainer';
import ProductList from './components/ProductList';

class App extends Component {

  componentWillMount() {
    this.setState({
      filters: []
    })
  }

  setFilters = (filters) => {
    this.refs.products.updateFilters(filters);
  }

  render() {
    return (
      <div className="app">
        <FilterContainer setFilters={this.setFilters} />
        <ProductList filters={this.state.filters} ref="products" />
      </div>
    );
  }
}

export default App;
