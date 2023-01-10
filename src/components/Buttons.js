import React, { Component } from 'react';

export default class Buttons extends Component {
  render() {
    const { validateRows, reset } = this.props;

    return (
      <>
        <button type="button" id="add" onClick={validateRows}>
          Add Ingredient
        </button>
        <button type="button" id="reset" onClick={reset}>
          Reset
        </button>
        <button type="button" id="calculate" onClick={validateRows}>
          Calculate
        </button>
      </>
    );
  }
}
