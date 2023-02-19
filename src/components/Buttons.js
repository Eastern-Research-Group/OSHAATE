//import React, { Component } from 'react'; //TODO: 2/19 change this from class to function component on main branch
//export default class Buttons extends Component {
//render() {
//const { validateRows, reset } = this.props;
export const Buttons = ({ validateRows, reset }) => {
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
};
