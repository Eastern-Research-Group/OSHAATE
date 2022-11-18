import React from 'react';

function Tooltip({ children, title, position }) {
  return (
    <div className={`tooltip`} data-position={position} data-tool-tip={title}>
      {children}
    </div>
  );
}

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
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx}>
              <td>
                <label htmlFor="ingredient">
                  <input
                    type="text"
                    id="ingredient"
                    name="ingredient"
                    placeholder="Enter ingredient"
                    value={input.ingredient}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="WT">
                  <input
                    type="number"
                    min="0"
                    id="WT"
                    name="WT"
                    placeholder="Enter weight (%)"
                    value={input.WT}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LD50">
                  <input
                    type="number"
                    min="0"
                    id="LD50"
                    name="LD50"
                    placeholder="Enter LD50 (mg/kg)"
                    value={input.LD50}
                    onChange={(event) => handleFormChange(event, idx)}
                  />
                </label>
              </td>
              <td>
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
              <td>
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
                  <button type="button" onClick={() => removeRow(idx)}>
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
                <label htmlFor="unknown" className="tooltip">
                  Sum Unknown Toxicity &#9432;
                </label>
              </Tooltip>
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
    </div>
  );
};

export default Input;
