import React from 'react';
import { useState } from 'react';

function DermalInput() {
  let validated = false;
  let dermalResult = 0;
  const [inputFields, setInputFields] = useState([
    {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDoseData: '',
      classification: '',
    },
  ]);

  const handleChange = (idx, event) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    validateRows();
    if (validated) {
      let newfield = {
        ingredient: '',
        WT: '',
        LD50: '',
        limitDoseData: '',
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
        data[data.length - 1].limitDoseData === '' &&
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
          data[data.length - 1].limitDoseData === '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDoseData !== '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDoseData === '' &&
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

  const removeFields = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const calculate = () => {
    validateRows();
    //console.log(inputFields);
    //CALCULATIONS
    let data = [...inputFields];
    const results = data.map((obj) => {
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
      if (obj.limitDoseData !== '') {
        return {
          ...obj,
          limitDoseData:
            parseFloat(obj.WT) /
            dermalPointEstimateLookup('Limit Dose', obj.limitDoseData),
        };
      }
      return obj;
    });

    //console.log(results);
    let sum = 0;
    results.forEach((element) => {
      if (element.LD50 !== '') {
        sum += element.LD50;
      }
      if (element.limitDoseData !== '') {
        sum += element.limitDoseData;
      }
      if (element.classification !== '') {
        sum += element.classification;
      }
    });
    dermalResult = 100 / sum;
    console.log(dermalResult); //TODO: this should not output if empty input fields
  };

  //TODO: split this out to its own file?
  function dermalPointEstimateLookup(type, val) {
    var result = '';
    var lookup = [
      {
        classification: 'Category 1',
        'Limit Dose': '≤ 50',
        'Point Estimate': 5,
      },
      {
        Classification: 'Category 2',
        'Limit Dose': '> 50 - ≤ 200',
        'Point Estimate': 50,
      },
      {
        Classification: 'Category 3',
        'Limit Dose': '> 200 - ≤ 1,000',
        'Point Estimate': 300,
      },
      {
        Classification: 'Category 4',
        'Limit Dose': '> 1,000 - ≤ 2,000',
        'Point Estimate': 1100,
      },
      {
        Classification: 'Category 5',
        'Limit Dose': '> 2,000 - ≤ 5,000',
        'Point Estimate': 2500,
      },
      {
        Classification: 'Not Classified (LD50 > 5,000)',
        'Limit Dose': '> 2,000 (No signs of toxicigty)',
        'Point Estimate': null,
      },
    ];

    result = lookup
      .filter((item) => item[type] === val)
      .map((item) => item['Point Estimate']);
    //console.log(result);
    return result;
  }

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
                      value={input.ingredient}
                      onChange={(event) => handleChange(idx, event)}
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
                      value={input.WT}
                      onChange={(event) => handleChange(idx, event)}
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
                      value={input.LD50}
                      onChange={(event) => handleChange(idx, event)}
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="limitDoseData">
                    <select
                      name="limitDoseData"
                      id="limitDoseData"
                      value={input.limitDoseData}
                      onChange={(event) => handleChange(idx, event)}
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
                      onChange={(event) => handleChange(idx, event)}
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
                    <button onClick={() => removeFields(idx)}>Remove</button>
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
                  <input type="text" id="combinedUnknownWeight" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div></div>
        <br />
        <button type="button" onClick={addFields}>
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
      <p>{dermalResult}</p>
    </div>
  );
}

export default DermalInput;
