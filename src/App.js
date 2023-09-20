import React, { Component } from 'react';
import { Checkbox } from './components/Checkbox';
import PathwayList from './components/PathwayList';
import './App.css';
import pdf from "./doc/ATE-Calculator-User-Guide.pdf";

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
            acute toxicity. This information is found in <a href="https://www.osha.gov/hazcom/appendix-a" target="_blank"  rel="noreferrer">Appendix A.1 in the HCS </a>
             and <a href="https://unece.org/ghs-rev7-2017" target="_blank" rel="noreferrer">Chapter 3.1 in the GHS</a>.
          </p>
          <p>
            The ATE calculator is designed to calculate the ATE for a mixture
            even in the case where some of the information is not known for some
            ingredients.
          </p>
        </div>
        <div>
          <p>
           <a href={pdf} target="_blank" rel="noreferrer">Guidnace on how to use the calculator</a> 
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

        <h2>References</h2>
        <div className="paragraph-text">
          <p>
          OSHA Hazard Communication Standard (29 CFR 1910.1200).
          </p>

          <p>
          The United Nations Globally Harmonized System of Classification and Labelling of Chemicals (GHS); Seventh revised edition (ST/SG/AC.10/30/Rev.7).
          </p>
          
        </div>
        <hr />
  
        <div class="alert alert-info">
        <h4>Disclaimer</h4>
              <p>The U.S. Department of Labor maintains this website to enhance public access to the department's information. This is a service that is continually under development. We will make every effort to keep this site current and to correct errors brought to our attention.
              </p>
              <p>The documents on this site may contain links to information created and maintained by other public and private organizations. Please be aware that we do not control or guarantee the accuracy, relevance, timeliness, or completeness of this outside information. Further, the inclusion of links to particular items is not intended to reflect their importance, nor is it intended to endorse any views expressed or products or services offered by the author of the reference or the organization operating the site on which the reference is maintained.</p>
          </div>
      </div>
    );
  }
}
