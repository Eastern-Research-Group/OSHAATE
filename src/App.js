import React, { Component } from 'react';
import Checkbox from './components/Checkbox';
import PathwayList from './components/PathwayList';
import './App.css';

const pathwaysList = [
  {
    id: 1,
    title: '2.1 Enter Ingredients: Dermal',
    category: 'dermal',
  },
  {
    id: 2,
    title: '2.2 Enter Ingredients: Oral',
    category: 'oral',
  },
  {
    id: 3,
    title: '2.3 Enter Ingredients: Inhalation - Gases',
    category: 'inhalationGases',
  },
  {
    id: 4,
    title: '2.4 Enter Ingredients: Inhalation - Vapors',
    category: 'inhalationVapors',
  },
  {
    id: 5,
    title: '2.5 Enter Ingredients: Inhalation - Dusts/Mists',
    category: 'inhalationDustsMists',
  },
];

export default class App extends Component {
  state = {
    pathways: pathwaysList,
    categories: {
      dermal: false,
      oral: false,
      inhalationGases: false,
      inhalationVapors: false,
      inhalationDustsMists: false,
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
          <legend>
            <h3>1. Choose Exposure Route(s):</h3>
          </legend>
          <Checkbox
            id="1"
            title="Dermal"
            name="dermal"
            checked={this.state.categories.dermal}
            handleChange={this.handleChange}
          />
          <Checkbox
            id="2"
            title="Oral"
            name="oral"
            handleChange={this.handleChange}
            checked={this.state.categories.oral}
          />
          <Checkbox
            id="3"
            title="Inhalation - Gases"
            name="inhalationGases"
            handleChange={this.handleChange}
            checked={this.state.categories.inhalationGases}
          />
          <Checkbox
            id="4"
            title="Inhalation - Vapors"
            name="inhalationVapors"
            handleChange={this.handleChange}
            checked={this.state.categories.inhalationVapors}
          />
          <Checkbox
            id="5"
            title="Inhalation - Dusts/Mists"
            name="inhalationDustsMists"
            handleChange={this.handleChange}
            checked={this.state.categories.inhalationDustsMists}
          />
        </fieldset>
        <PathwayList
          pathways={
            filteredPathways.length === 0
              ? [] //this.state.products
              : filteredPathways
          }
        />
      </div>
    );
  }
}
