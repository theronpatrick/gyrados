import React, { Component } from 'react';
class FilterContainer extends Component {

  componentWillMount() {

    this.setState({
      properties: this.props.properties,
      operators: this.props.operators,
      filters: [{}]
    })

  }

  // If this got bigger could be moved into own component
  _getInputTemplate(index) {
    return (
    <div key={index}>
      <select>
        {this.state.properties.map((value, key) => {
          return <option value={value.id} key={value.id}>{value.name}</option>;
        })}
      </select>
      <select>
        {this.state.operators.map((value, key) => {
          return <option value={value.id} key={value.id}>{value.text}</option>;
        })}
      </select>
      <input></input>
    </div>
    )
  }

  _addFilter = () => {
    console.log("in add filter " , this.state.filters)

    let filters = this.state.filters;
    filters.push({});

    this.props.setFilters(filters)

    this.setState({
      filters: filters
    })
  }

  _formSubmit(e) {
    e.preventDefault();
  }

  _formChanged = () => {
    let filters = this.state.filters;
    this.props.setFilters(filters);
  }

  render() {

    let inputs = [];

    this.state.filters.forEach((value, index) => {
      inputs.push(this._getInputTemplate(index))
    })


    this._getInputTemplate();

    return (
      <div className="filter-container">
        <form onSubmit={this._formSubmit} onChange={this._formChanged}>
          <button onClick={this._addFilter}>Add Filter</button>
          {inputs}
        </form>
      </div>
    );
  }
}

export default FilterContainer;
