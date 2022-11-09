import React from 'react'; //, { useState }

const Input = ({
  inputFields,
  handleFormChange,
  handleUnknownChange,
  removeRow,
}) => {
  return (
    <div id="tablewrapper">
      <table id="dermal">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>LD50 (mg/kg)</th>
            <th>Limit Dose (mg/kg)</th>
            <th>Classification (mg/kg)</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr id="addr0" key={idx}>
              <td data-label="Ingredient">
                <label htmlFor="ingredient">
                  <input
                    type="text"
                    id="ingredient"
                    name="ingredient"
                    //required="required"
                    placeholder="Enter ingredient"
                    value={input.ingredient}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td data-label="WT%">
                <label htmlFor="WT">
                  <input
                    type="number"
                    id="WT"
                    min="0"
                    name="WT"
                    //required="required"
                    placeholder="Enter weight (%)"
                    value={input.WT}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td data-label="LD50 (mg/kg)">
                <label htmlFor="LD50">
                  <input
                    type="number"
                    id="LD50"
                    min="0"
                    name="LD50"
                    placeholder="Enter LD50 (mg/kg)"
                    value={input.LD50}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td data-label="Limit Dose (mg/kg)">
                <label htmlFor="limitDose">
                  <select
                    name="limitDose"
                    id="limitDose"
                    value={input.limitDose}
                    onChange={(event) => handleFormChange(event, idx)}
                  >
                    <option value="">Select Limit Dose</option>
                    <option>&le; 50</option>
                    <option>&gt; 50 - &le; 200</option>
                    <option>&gt; 200 - &le; 1,000</option>
                    <option>&gt; 1,000 - &le; 2,000</option>
                    <option>&gt; 2,000 - &le; 5,000</option>
                    <option>&gt; 2,000 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td data-label="Classification (mg/kg)">
                <label htmlFor="classification">
                  <select
                    name="classification"
                    id="classification"
                    value={input.classification}
                    onChange={(event) => handleFormChange(event, idx)}
                  >
                    <option value="">Select Classification</option>
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
                  <button onClick={() => removeRow(idx)}>Remove</button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <br />
              <label htmlFor="unknown">
                <b>Combined Unknown:</b>
              </label>
            </td>
            <td>
              <br />
              <input
                type="text"
                id="unknown"
                name="unknown"
                placeholder="Enter weight (%)"
                //value={inputFields.unknown}
                onChange={(event) => handleUnknownChange(event)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
