//import React, { Component } from 'react';
//export default class Checkbox extends Component { //TODO: 2/19 change this from class to function component on main branch
//render() {
//const { id, title, name, handleChange, checked } = this.props;
export const Checkbox = ({ id, title, name, handleChange, checked }) => {
  return (
    <>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        {title}
      </label>
    </>
  );
};
