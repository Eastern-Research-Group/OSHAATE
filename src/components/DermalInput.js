import React from 'react';
import { useState } from 'react';

function DermalInput() {
  let validated = false;
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
      } //else {
      validated = true;
      console.log(inputFields);
      //return;
      //}
    }
  };

  const removeFields = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const submit = (e) => {
    validateRows();
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submit}>
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
                  <input
                    type="text"
                    name="ingredient"
                    //required="required"
                    value={input.ingredient}
                    onChange={(event) => handleChange(idx, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="WT"
                    //required="required"
                    value={input.WT}
                    onChange={(event) => handleChange(idx, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="LD50"
                    value={input.LD50}
                    onChange={(event) => handleChange(idx, event)}
                  />
                </td>
                <td>
                  <select
                    name="limitDoseData"
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
                </td>
                <td>
                  <select
                    name="classification"
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
                <label>
                  <input type="text" placeholder="Combined Unknown" />
                </label>
              </td>
              <td>
                <input type="text" />
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
        <button type="submit" onClick={submit}>
          Calculate
        </button>
        {/*{this.state.rows.length === 1 ? null : (
          <button onClick={this.handleRemoveRow}>Delete Last Row</button>
        )}*/}
      </form>
    </div>
  );
}

export default DermalInput;
