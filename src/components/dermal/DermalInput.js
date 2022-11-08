import React from 'react'; //, { useState }

const Input = ({ inputFields, handleFormChange, removeFormFields }) => {
  /*const [checked, setChecked] = useState(false);

  function toggle(value) {
    return !value;
  }*/

  return (
    <div>
      <table id="dermal">
        <thead>
          <tr>
            <th></th>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>LD50 (mg/kg)</th>
            <th>Limit Dose (mg/kg)</th>
            <th>Classification (mg/kg)</th>
            <th>Unknown</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr id="addr0" key={idx}>
              <td>{idx + 1}</td>
              <td data-label="Ingredient">
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
                    onChange={(event) => handleFormChange(idx, event)}
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
                    onChange={(event) => handleFormChange(idx, event)}
                  />
                </label>
              </td>
              <td data-label="Limit Dose (mg/kg)">
                <label htmlFor="limitDose">
                  <select
                    name="limitDose"
                    id="limitDose"
                    value={input.limitDose}
                    onChange={(event) => handleFormChange(idx, event)}
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
                    onChange={(event) => handleFormChange(idx, event)}
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
              <td data-label="Unknown">
                {/* See: https://codesandbox.io/s/react-hooks-usestate-checkbox-onchange-vs-onclick-8w9v2?file=/src/index.js
                https://medium.com/programming-essentials/how-to-manage-a-checkbox-with-react-hooks-f8c3d973eeca */}
                <label htmlFor="unknown">
                  <input
                    type="checkbox"
                    id="unknown"
                    name="unknown"
                    //checked={checked}
                    //onChange={() => setChecked(toggle)}

                    onChange={(event) => handleFormChange(idx, event)}

                    //onChange={(e) => setChecked(e.target.checked)}
                    //value={input.WT}
                    //onChange={(event) => handleFormChange(idx, event)}
                  />
                </label>
              </td>
              <td>
                {idx === 0 ? null : (
                  <button onClick={() => removeFormFields(idx)}>Remove</button>
                )}
              </td>
            </tr>
          ))}
          {/*<tr>
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
                </tr>*/}
        </tbody>
      </table>
    </div>
  );
};

export default Input;
