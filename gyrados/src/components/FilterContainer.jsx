import React, { Component } from 'react';
import FilterInput from './FilterInput'
class FilterContainer extends Component {

  /*** This container will set the list of filters to be applied to the product list
  A filter will be an object with the following attributes:
  {
    propertyNameID
    operatorID
    propertyValue
  }
  ***/
  componentWillMount() {

    this.setState({
      properties: this.props.properties || [],
      operators: this.props.operators || [],
      filters: []
    }, () => {
      // Start with one filter
      this._addFilter();
    })
  }

  _inputChange = (e) => {

    let index = e.target.getAttribute("data-index");
    let value = e.target.value;
    let type = e.target.getAttribute("data-input-type");

    let filters = this.state.filters;

    // Convert property name ID to an int to match product data
    if (type === "propertyNameID") {
      value = parseInt(value);
    }

    filters[index][type] = value;

    this.setState({
      filters: filters
    })

    // Send data up
    this.props.setFilters(filters);
  }

  _addFilter = () => {

    let filters = this.state.filters;

    filters.push({
      propertyNameID: this.state.properties[0].id,
      operatorID: this.state.operators[0].id,
      propertyValue: ""
    });

    this.props.setFilters(filters)

    this.setState({
      filters: filters
    })
  }

  _formSubmit(e) {
    e.preventDefault();
  }

  render() {

    let inputs = [];

    this.state.filters.forEach((value, index) => {
      inputs.push(<FilterInput
        index={index}
        properties={this.state.properties}
        operators={this.state.operators}
        inputChange={this._inputChange}
         />)
    })


    return (
      <div className="filter-container">
        <form onSubmit={this._formSubmit} onChange={this._formChanged}>
          <button className="add-button" onClick={this._addFilter}>Add Filter</button>
          {inputs}
        </form>
      </div>
    );
  }
}

export default FilterContainer;
