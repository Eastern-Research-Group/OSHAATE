import React from 'react';
import { useState } from 'react';
import { dermalPointEstimateLookup } from './Lookups.js';

//function DermalInput() {
const DermalInput = () => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDose: '',
      classification: '',
    },
  ]);
  const [dermalResult, setDermalResult] = useState(0);
  let validated = false;

  const handleFormChange = (idx, event) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFormFields = () => {
    validateRows();
    if (validated) {
      let newfield = {
        ingredient: '',
        WT: '',
        LD50: '',
        limitDose: '',
        classification: '',
      };
      setInputFields([...inputFields, newfield]);
    }
  };

  const validateRows = () => {
    //validate last row before adding new row
    let data = [...inputFields];
    if (data.length > 0) {
      if (data[data.length - 1].ingredient === '') {
        alert('Ingredient is required in the last row.');
        return false;
      }
      if (data[data.length - 1].WT === '') {
        alert('Weight (WT) is required in the last row.');
        return false;
      }
      if (
        data[data.length - 1].LD50 === '' &&
        data[data.length - 1].limitDose === '' &&
        data[data.length - 1].classification === ''
      ) {
        alert(
          'LD50 or Limit Dose Data or Classification is required in the last row.'
        );
        return false;
      }
      if (
        !(
          data[data.length - 1].LD50 !== '' &&
          data[data.length - 1].limitDose === '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDose !== '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDose === '' &&
          data[data.length - 1].classification !== ''
        )
      ) {
        alert(
          'Enter only one of LD50, Limit Dose Data, or Classification in the last row.'
        );
        return false;
      }
      validated = true;
      //console.log(inputFields);
    }
  };

  const calculate = (e) => {
    e.preventDefault();
    validateRows();
    //console.log(inputFields);
    if (validated) {
      //CALCULATIONS
      let d = [...inputFields];
      const results = d.map((obj) => {
        //Calculate LD50 values: if not empty, return weight/LD50 value
        if (obj.LD50 !== '') {
          return {
            ...obj,
            LD50: parseFloat(obj.WT) / parseFloat(obj.LD50),
          };
        }
        //Calculate Classification values: if not empty, return weight/point estimate
        if (obj.classification !== '') {
          return {
            ...obj,
            classification:
              parseFloat(obj.WT) /
              dermalPointEstimateLookup('Classification', obj.classification),
          };
        }
        //Calculate Limit Dose values: if not empty, return weight/point estimate
        if (obj.limitDose !== '') {
          return {
            ...obj,
            limitDose:
              parseFloat(obj.WT) /
              dermalPointEstimateLookup('Limit Dose', obj.limitDose),
          };
        }
        return obj;
      });

      //console.log(results);
      let sum = 0;
      results.forEach((item) => {
        if (item.LD50 !== '') {
          sum += item.LD50;
        }
        if (item.limitDose !== '') {
          sum += item.limitDose;
        }
        if (item.classification !== '') {
          sum += item.classification;
        }
      });
      //TODO: this needs to be passed to Results
      setDermalResult(100 / sum);
    }
  };

  const removeFormFields = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  return (
    <div>
      <form onSubmit={calculate}>
        <table id="dermal">
          <thead>
            <tr>
              {/*<th>#</th>*/}
              <th>Ingredient</th>
              <th>WT%</th>
              <th>LD50 (mg/kg)</th>
              <th>Limit Dose Data (mg/kg)</th>
              <th>Classification (mg/kg)</th>
            </tr>
          </thead>
          <tbody>
            {inputFields.map((input, idx) => (
              <tr id="addr0" key={idx}>
                {/*<td>{idx}</td>*/}
                <td>
                  <label htmlFor="ingredient">
                    <input
                      type="text"
                      id="ingredient"
                      name="ingredient"
                      //required="required"
                      placeholder="Enter ingredient"
                      value={input.ingredient}
                      onChange={(event) => handleFormChange(idx, event)}
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="WT">
                    <input
                      type="number"
                      id="WT"
                      min="0"
                      name="WT"
                      //required="required"
                      placeholder="Enter weight (%)"
                      value={input.WT}
                      onChange={(event) => handleFormChange(idx, event)}
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="LD50">
                    <input
                      type="number"
                      id="LD50"
                      min="0"
                      name="LD50"
                      //placeholder="Enter LD50 (mg/kg)"
                      value={input.LD50}
                      onChange={(event) => handleFormChange(idx, event)}
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="limitDose">
                    <select
                      name="limitDose"
                      id="limitDose"
                      value={input.limitDose}
                      onChange={(event) => handleFormChange(idx, event)}
                    >
                      <option value="">Select</option>
                      <option>&le; 50</option>
                      <option>&gt; 50 - &le; 200</option>
                      <option>&gt; 200 - &le; 1,000</option>
                      <option>&gt; 1,000 - &le; 2,000</option>
                      <option>&gt; 2,000 - &le; 5,000</option>
                      <option>&gt; 2,000 (No signs of toxicity)</option>
                    </select>
                  </label>
                </td>
                <td>
                  <label htmlFor="classification">
                    <select
                      name="classification"
                      id="classification"
                      value={input.classification}
                      onChange={(event) => handleFormChange(idx, event)}
                    >
                      <option value="">Select</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                      <option>Category 3</option>
                      <option>Category 4</option>
                      <option>Category 5</option>
                      <option>Not Classified (LD50 &gt; 5,000)</option>
                    </select>
                  </label>
                </td>
                <td>
                  {idx === 0 ? null : (
                    <button onClick={() => removeFormFields(idx)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <label htmlFor="combinedUnknown">
                  <input
                    type="text"
                    id="combinedUnknown"
                    placeholder="Combined Unknown"
                  />
                </label>
              </td>
              <td>
                <label htmlFor="combinedUnknownWeight">
                  <input
                    type="text"
                    id="combinedUnknownWeight"
                    placeholder="Enter weight (%)"
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div></div>
        <br />
        <button type="button" onClick={addFormFields}>
          Add Row
        </button>{' '}
        &nbsp;
        <button type="button" onClick={calculate}>
          Calculate
        </button>
        {/*{this.state.rows.length === 1 ? null : (
          <button onClick={this.handleRemoveRow}>Delete Last Row</button>
        )}*/}
      </form>
      <br />
      <div id="dermalResults">
        <hr />
        <p>
          <b>Dermal Pathway Result</b>: {dermalResult}
        </p>
      </div>
    </div>
  );
};

export default DermalInput;
