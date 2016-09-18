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
      filters: [],
      filterInputs: [],
      nextFilterIndex: 0
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

    // Build new filter input element and add it to list
    let filterInputs = this.state.filterInputs;
    let index = this.state.nextFilterIndex;

    let filterInput = <FilterInput
      index={index}
      properties={this.state.properties}
      operators={this.state.operators}
      inputChange={this._inputChange}
      removeFilter={this._removeFilter}
    />

    filterInputs.push(filterInput)

    console.log("inputs is " , filterInputs);

    this.setState({
      filters: filters,
      filterInputs: filterInputs,
      nextFilterIndex: index + 1
    })
  }

  _removeFilter = (e) => {
    let index = e.target.getAttribute("data-index");

    let filters = this.state.filters;
    filters.splice(index, 1);

    // Send data up
    this.props.setFilters(filters);

    // Remove filter input by finding its ID
    let filterInputs = this.state.filterInputs;

    for (let i = 0; i < filterInputs.length; i++) {
      let filter = filterInputs[i];
      console.log("ids..." , filter.props.index)
      if (filter.props.index === parseInt(index)) {
        console.log("in match")
        filterInputs.splice(i, 1);
        return;
      }
    }


    this.setState({
      filters: filters,
      filterInputs: filterInputs
    })
  }

  _formSubmit(e) {
    e.preventDefault();
  }

  render() {

    return (
      <div className="filter-container">
        <form onSubmit={this._formSubmit} onChange={this._formChanged}>
          <button className="add-button" onClick={this._addFilter}>Add Filter</button>
          {this.state.filterInputs}
        </form>
      </div>
    );
  }
}

export default FilterContainer;
