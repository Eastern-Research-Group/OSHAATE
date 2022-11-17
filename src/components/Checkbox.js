import React, { Component } from 'react';

export default class Checkbox extends Component {
  render() {
    const { id, title, name, handleChange, checked } = this.props;

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
  }
}
