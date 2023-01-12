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
  unknown,
  handleFormChange,
  handleUnknownChange,
  removeRow,
}) => {
  return (
    <div className="tablewrapper">
      <table id="dermal">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>
              LD<sub>50</sub> (mg/kg)
            </th>
            <th>Limit Dose Data (mg/kg)</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx}>
              <td>
                <label htmlFor="ingredient_dermal">
                  <input
                    type="text"
                    id="ingredient_dermal"
                    name="ingredient_dermal"
                    placeholder="Enter ingredient"
                    value={input.ingredient_dermal}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weight_dermal">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_dermal"
                    name="weight_dermal"
                    placeholder="Enter weight (%)"
                    value={input.weight_dermal}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LD50_dermal">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LD50_dermal"
                    name="LD50_dermal"
                    placeholder="Enter LD50 (mg/kg)"
                    value={input.LD50_dermal}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="limitdose_dermal">
                  <select
                    name="limitdose_dermal"
                    id="limitdose_dermal"
                    value={input.limitdose_dermal}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Limit Dose Data</option>
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
                <label htmlFor="classification_dermal">
                  <select
                    name="classification_dermal"
                    id="classification_dermal"
                    value={input.classification_dermal}
                    onChange={(e) => handleFormChange(e, idx)}
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
                  <button type="button" onClick={(e) => removeRow(e, idx)}>
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
                <label htmlFor="unknown_dermal" className="tooltip">
                  Sum Unknown Toxicity <span>&#9432;</span>
                </label>
              </Tooltip>
            </td>
            <td>
              <br />
              <input
                type="number"
                min="0"
                step="0.01"
                id="unknown_dermal"
                name="unknown_dermal"
                placeholder="Enter weight (%)"
                value={unknown}
                onChange={(e) => handleUnknownChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
