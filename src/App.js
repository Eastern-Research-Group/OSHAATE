import React, { Component } from 'react';
import { Checkbox } from './components/Checkbox';
import PathwayList from './components/PathwayList';
import './App.css';

const pathwaysList = [
  {
    id: 1,
    title: '2.1 Enter Ingredients: Oral',
    category: 'Oral',
  },
  {
    id: 2,
    title: '2.2 Enter Ingredients: Dermal',
    category: 'Dermal',
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
        <div className="paragraph-text">
          <p>
            In the UN GHS and the OSHA HCS, acute toxicity refers to serious
            adverse health effects (i.e., lethality) occurring after a single or
            short-term oral, dermal or inhalation exposure to a substance or
            mixture. In other words, it is the ability for a substance or
            mixture to lead to lethality at a specific dose (e.g., LD
            <sub>50</sub> or LC
            <sub>50</sub>). Acute toxicity values are expressed as LD
            <sub>50</sub> (oral, dermal) or LC<sub>50</sub> (inhalation) values
            or as acute toxicity estimates (ATE). The LD<sub>50</sub> refers to
            the dose that causes 50 percent lethality in an oral or dermal
            study. The LC
            <sub>50</sub> refers to the concentration in air that causes 50
            percent lethality in an inhalation study (gas, vapor, mist, or
            dust).
          </p>
          <p>
            The classification criteria use the ATE (acute toxicity estimate)
            value for classification purposes. For example, a substance or
            mixture having an ATE of 48 mg/kg for dermal is a category 1 for
            acute toxicity. This information is found in Appendix A.1 in the HCS
            and Chapter 3.1 in the GHS.
          </p>
          <p>
            The ATE calculator is designed to calculate the ATE for a mixture
            even in the case where some of the information is not known for some
            ingredients.
          </p>
        </div>
        <hr />
        <h2>Data Input</h2>
        <fieldset>
          <legend>1. Choose Exposure Route(s):</legend>
          <Checkbox
            id="1"
            title="Oral"
            name="Oral"
            handleChange={this.handleChange}
            checked={this.state.categories.Oral}
          />
          <Checkbox
            id="2"
            title="Dermal"
            name="Dermal"
            checked={this.state.categories.Dermal}
            handleChange={this.handleChange}
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

        <h2>Definitions</h2>
        <div className="paragraph-text">
          <p>
            <strong>Ingredient</strong> - the specific substance contained
            within the mixture or a mixture within another mixture.
          </p>

          <p>
            <strong>WT</strong> - percent by weight of the ingredient within the
            mixture.
          </p>

          <p>
            <strong>
              LD<sub>50</sub> mg/kg
            </strong>{' '}
            - Dose (expressed in milligrams per kilogram) of a substance or
            mixture that kills 50 percent (after single exposure) of animals in
            an oral or dermal study. Oral studies are usually performed in rats
            or mice while dermal studies often used rabbits. However, other
            animal species may be used in the tests.
          </p>

          <p>
            <strong>
              LC<sub>50</sub> ppm
            </strong>{' '}
            - Concentration of a gas (expressed in parts per million) of a
            substance or mixture that kills 50 percent (single exposure for 1-4
            hours) of animals in an inhalation study. Inhalation studies are
            usually performed in rats, however, other animal species (e.g.,
            mice, rabbits, pigeons) may be used in the tests. The HCS and GHS
            use a 4-hour time point to calculate lethality so any value other
            than 4 hours would need to be converted to the 4-hour value (GHS,
            Rev.10, paragraph 3.1.5.3). LC50 mg/l - Concentration of a vapor
            (expressed in milligrams per liter air) of a substance or mixture
            that kills 50 percent (single exposure for 1-4 hours) of animals in
            an inhalation study. Inhalation studies are usually performed in
            rats, however, other animal species (e.g., mice, rabbits, pigeons)
            may be used in the tests. The HCS and GHS use a 4-hour time point to
            calculate lethality so any value other than 4 hours would need to be
            converted to the 4-hour value (GHS, Rev.10, paragraph 3.1.5.3).{' '}
          </p>

          <p>
            <strong>
              LC<sub>50</sub> mg/l
            </strong>{' '}
            - Concentration of a mist, dusts, or particles (expressed in
            milligrams per liter air) of a substance or mixture that kills 50
            percent (single exposure for 1-4 hours) of animals in an inhalation
            study. Inhalation studies are usually performed in rats, however,
            other animal species (e.g., mice, rabbits, pigeons) may be used in
            the tests. Sometimes this information will be expressed as mg/m3.
            This information is easily converted to mg/l by dividing the
            concentration in mg/m3 by 1000 to get the mg/l value. The HCS and
            GHS use a 4-hour time point to calculate lethality so any value
            other than 4 hours would need to be converted to the 4-hour value
            (GHS, Rev.10, paragraph 3.1.5.3).
          </p>

          <p>
            <strong>Limit dose data</strong> - this value is used if the only
            data available for an individual ingredient is a range estimate.
          </p>

          <p>
            <strong>Classification </strong> - this value is used if the only
            data available for an individual ingredient is the hazard category
            for this specific endpoint.
          </p>
        </div>
      </div>
    );
  }
}
