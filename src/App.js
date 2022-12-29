import React, { Component } from 'react';
import Checkbox from './components/Checkbox';
import PathwayList from './components/PathwayList';
import './App.css';

const pathwaysList = [
  {
    id: 1,
    title: '2.1 Enter Ingredients: Dermal',
    category: 'Dermal',
  },
  {
    id: 2,
    title: '2.2 Enter Ingredients: Oral',
    category: 'Oral',
  },
  {
    id: 3,
    title: '2.3 Enter Ingredients: Inhalation - Gases',
    category: 'Gases',
  },
  {
    id: 4,
    title: '2.4 Enter Ingredients: Inhalation - Vapors',
    category: 'Vapors',
  },
  {
    id: 5,
    title: '2.5 Enter Ingredients: Inhalation - Dusts/Mists',
    category: 'Dusts',
  },
];

export default class App extends Component {
  state = {
    pathways: pathwaysList,
    categories: {
      Dermal: false,
      Oral: false,
      Gases: false,
      Vapors: false,
      Dusts: false,
    },
  };

  handleChange = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name],
        },
      };
    });
  };

  render() {
    const checkedPathways = Object.entries(this.state.categories)
      .filter((category) => category[1])
      .map((category) => category[0]);
    const filteredPathways = this.state.pathways.filter(({ category }) =>
      checkedPathways.includes(category)
    );

    return (
      <div className="App">
        <h1>OSHA ATE Calculator</h1>
        <p>Intro text and links to reference and guidelines.</p>
        <hr />
        <h2>Data Input Section</h2>
        <fieldset>
          <legend>1. Choose Exposure Route(s):</legend>
          <Checkbox
            id="1"
            title="Dermal"
            name="Dermal"
            checked={this.state.categories.Dermal}
            handleChange={this.handleChange}
          />
          <Checkbox
            id="2"
            title="Oral"
            name="Oral"
            handleChange={this.handleChange}
            checked={this.state.categories.Oral}
          />
          <Checkbox
            id="3"
            title="Inhalation - Gases"
            name="Gases"
            handleChange={this.handleChange}
            checked={this.state.categories.Gases}
          />
          <Checkbox
            id="4"
            title="Inhalation - Vapors"
            name="Vapors"
            handleChange={this.handleChange}
            checked={this.state.categories.Vapors}
          />
          <Checkbox
            id="5"
            title="Inhalation - Dusts/Mists"
            name="Dusts"
            handleChange={this.handleChange}
            checked={this.state.categories.Dusts}
          />
        </fieldset>
        <hr />
        <PathwayList
          pathways={filteredPathways.length === 0 ? [] : filteredPathways}
        />
      </div>
    );
  }
}
