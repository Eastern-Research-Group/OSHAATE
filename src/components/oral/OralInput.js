import React from 'react';

function Tooltip({ children, title, position }) {
  return (
    <div className={`tooltip`} data-position={position} data-tool-tip={title}>
      {children}
    </div>
  );
}

const Input = ({
  oralInputFields,
  handleOralFormChange,
  handleOralUnknownChange,
  removeRow,
}) => {
  return (
    <div className="tablewrapper">
      <table id="oral">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>Available Toxicity</th>
          </tr>
        </thead>
        <tbody>
          {oralInputFields.map((input, idx) => (
            <tr key={idx}>
              <td>
                <label htmlFor="ingredientOral">
                  <input
                    type="text"
                    id="ingredientOral"
                    name="ingredientOral"
                    placeholder="Enter ingredient"
                    value={input.ingredient}
                    onChange={(event) => handleOralFormChange(event, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weightOral">
                  <input
                    type="number"
                    min="0"
                    id="weightOral"
                    name="weightOral"
                    placeholder="Enter weight (%)"
                    value={input.weightOral}
                    onChange={(event) => handleOralFormChange(event, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="toxicity">
                  <select
                    name="toxicity"
                    id="toxicity"
                    value={input.toxicity}
                    onChange={(event) => handleOralFormChange(event, idx)}
                  >
                    <option value="">Select Available Toxicity</option>
                    <option>0 &lt; Category 1 &le; 5</option>
                    <option>5 &lt; Category 2 &le; 50</option>
                    <option>50 &lt; Category 3 &le; 300</option>
                    <option>300 &lt; Category 4 &le; 2,000</option>
                    <option>2,000 &lt; Category 5 &le; 5,000</option>
                  </select>
                </label>
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
              <Tooltip
                title='Sum of relevant ingredient(s) with unknown "route name" toxicity'
                position="right"
              >
                <label htmlFor="unknownOral" className="tooltip">
                  Sum Unknown Toxicity &#9432;
                </label>
              </Tooltip>
            </td>
            <td>
              <br />
              <input
                type="number"
                id="unknownOral"
                name="unknownOral"
                placeholder="Enter weight (%)"
                onChange={(event) => handleOralUnknownChange(event)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
