import React, { Component } from 'react';
class FilterInput extends Component {

  componentWillMount() {
    this.setState({
      inputElementType: "select"
    })
  }

  // Need input change in component to switch input to select based on type, but also need to call parent change function
  _propertyTypeChange = (e) => {

    // This is required because we want to pass the event along AFTER we do a setState
    e.persist();

    let propertyIndex = e.target.value;
    let property = this.props.properties[propertyIndex];

    this.setState({
      selectedProperty: property
    }, () => {
      this.props.inputChange(e);

      // Kind of hacky to force a change like this, but need to update both values when property changes
      var ev1 = new Event('change', {bubbles: true});
      this.refs.propertyValueElement.dispatchEvent(ev1);

    })
  }

  // Return list of valid operators for each type
  _getOperatorsForType(type) {
    switch(type) {
      case "string":
        return {
          "equals": true,
          "any": true,
          "none": true,
          "in": true,
          "contains": true
        }
      break;
      case "number":
        return {
          "equals": true,
          "any": true,
          "none": true,
          "in": true,
          "greater_than": true,
          "less_than": true
        }
      break;
      case "enumerated":
        return {
          "equals": true,
          "any": true,
          "none": true,
          "in": true
        }
      break;
      default:
        console.error("invalid type")
    }
  }

  _getOperators() {
    let operators = this.props.operators;
    // Get type from state (if it's defined), otherwise just use string
    let type = this.state.selectedProperty ? this.state.selectedProperty.type : "string"
    let validOperators = this._getOperatorsForType(type);

    console.log("selectd " , this.state.selectedProperty)

    operators = operators.filter((value, key) => {
      if (validOperators[value.id]) {
        return true
      } else {
        return false;
      }
    })

    return operators;
  }

  render() {
  let index = this.props.index;
  let inputElement;
  // If there are property values, input should be select.  Otherwise, just make it an input
  let selectedProperty = this.state.selectedProperty || {};
  if (selectedProperty.values) {

    let options = selectedProperty.values.map((value, key) => {
      return <option value={value} key={key}>{value}</option>
    })

    inputElement = <select
      onChange={this.props.inputChange}
      data-index={this.props.index}
      data-input-type="propertyValue"
      ref="propertyValueElement"
      >{options}
    </select>
  } else {
    inputElement = <input
      key={this.props.index}
      data-index={this.props.index}
      data-input-type="propertyValue"
      onChange={this.props.inputChange}
      ref="propertyValueElement"
    ></input>
  }

  let operators = this._getOperators();

  return (
    <div key={index}>
      <select
        onChange={this._propertyTypeChange}
        data-input-type="propertyNameID"
        data-index={index}
        >{this.props.properties.map((value, key) => {
          return <option
          value={value.id}
          key={value.id}
          >{value.name}</option>;
        })}
      </select>
      <select
        onChange={this.props.inputChange}
        data-input-type="operatorID"
        data-index={index}
        ref="operatorElement"
        > {operators.map((value, key) => {
          return <option
            value={value.id}
            key={value.id}
            >{value.text}</option>;
        })}
      </select>

      {inputElement}

    </div>
    )
  }
}

export default FilterInput;
