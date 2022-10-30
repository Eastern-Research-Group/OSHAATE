import React from 'react';

const Input = ({ inputFields, handleFormChange, removeFormFields }) => {
  return (
    <div>
      <table id="dermal">
        <thead>
          <tr>
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
                  <button onClick={() => removeFormFields(idx)}>Remove</button>
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
    </div>
  );
};

export default Input;
