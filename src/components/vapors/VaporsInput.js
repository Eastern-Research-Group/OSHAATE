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
      <table id="vapors">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>LC50 (mg/l)</th>
            <th>Limit Dose Data (mg/kg)</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx}>
              <td>
                <label htmlFor="ingredient_vapors">
                  <input
                    type="text"
                    id="ingredient_vapors"
                    name="ingredient_vapors"
                    placeholder="Enter ingredient"
                    value={input.ingredient_vapors}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weight_vapors">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_vapors"
                    name="weight_vapors"
                    placeholder="Enter weight (%)"
                    value={input.weight_vapors}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LC50_vapors">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LC50_vapors"
                    name="LC50_vapors"
                    placeholder="Enter LC50 (mg/l)"
                    value={input.LC50_vapors}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="limitdose_vapors">
                  <select
                    name="limitdose_vapors"
                    id="limitdose_vapors"
                    value={input.limitdose_vapors}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Limit Dose Data</option>
                    <option>&le; 0.5</option>
                    <option>&gt; 0.5 - &le; 2.0</option>
                    <option>&gt; 2.0 - &le; 10.0</option>
                    <option>&gt; 10.0 - &le; 20.0</option>
                    <option>&gt; 20.0 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td>
                <label htmlFor="classification_vapors">
                  <select
                    name="classification_vapors"
                    id="classification_vapors"
                    value={input.classification_vapors}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Classification</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    <option>Not Classified (LC50 &gt; 20.0)</option>
                  </select>
                </label>
              </td>
              <td>
                {idx === 0 ? null : (
                  <button typ="button" onClick={(e) => removeRow(e, idx)}>
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
                <label htmlFor="unknown_vapors" className="tooltip">
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
                id="unknown_vapors"
                name="unknown_vapors"
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
