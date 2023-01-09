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
      <table id="gases">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>LC50 (ppmV)</th>
            <th>Limit Dose Data (mg/kg)</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx}>
              <td>
                <label htmlFor="ingredient_gases">
                  <input
                    type="text"
                    id="ingredient_gases"
                    name="ingredient_gases"
                    placeholder="Enter ingredient"
                    value={input.ingredient_gases}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weight_gases">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_gases"
                    name="weight_gases"
                    placeholder="Enter weight (%)"
                    value={input.weight_gases}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LC50_gases">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LC50_gases"
                    name="LC50_gases"
                    placeholder="Enter LC50 (ppmV)"
                    value={input.LC50_gases}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="limitdose_gases">
                  <select
                    name="limitdose_gases"
                    id="limitdose_gases"
                    value={input.limitdose_gases}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Limit Dose Data</option>
                    <option>&le; 100</option>
                    <option>&gt; 100 - &le; 500</option>
                    <option>&gt; 500 - &le; 2,500</option>
                    <option>&gt; 2,500 - &le; 20,000</option>
                    <option>&gt; 20,000 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td>
                <label htmlFor="classification_gases">
                  <select
                    name="classification_gases"
                    id="classification_gases"
                    value={input.classification_gases}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Classification</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    <option>Not Classified (LC50 &gt; 20,000)</option>
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
                <label htmlFor="unknown_gases" className="tooltip">
                  Sum Unknown Toxicity &#9432;
                </label>
              </Tooltip>
            </td>
            <td>
              <br />
              <input
                type="number"
                min="0"
                step="0.01"
                id="unknown_gases"
                name="unknown_gases"
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
