import React from 'react';

//TODO: Remove Arrows/Spinners for number type input
///* Chrome, Safari, Edge, Opera */
/*input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}*/
/* Firefox */
/*input[type=number] {
  -moz-appearance: textfield;
}*/

const Input = ({
  inputFields,
  handleFormChange,
  handleUnknownChange,
  removeRow,
}) => {
  return (
    <div id="tablewrapper">
      <table id="oral">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>Available Toxicity</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rows.map((input, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  name="ingredient"
                  required="required"
                  value={input.ingredient}
                  onChange={(event) => handleFormChange(idx, event)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="WT"
                  required="required"
                  value={input.WT}
                  onChange={(event) => handleFormChange(idx, event)}
                />
              </td>
              <td>
                <select
                  name="toxicity"
                  value={input.toxicity}
                  onChange={(event) => handleFormChange(idx, event)}
                >
                  <option>0 &lt; Category 1 &le; 5</option>
                  <option>5 &lt; Category 2 &le; 50</option>
                  <option>50 &lt; Category 3 &le; 300</option>
                  <option>300 &lt; Category 4 &le; 2,000</option>
                  <option>2,000 &lt; Category 5 &le; 5,000</option>
                </select>
              </td>
              <td>
                {idx === 0 ? null : (
                  <button typ="button" onClick={() => removeRow(idx)}>
                    Remove
                  </button>
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
                type="number"
                id="unknown"
                name="unknown"
                placeholder="Enter weight (%)"
                onChange={(event) => handleUnknownChange(event)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div></div>
      <br />
    </div>
  );
};

export default Input;
