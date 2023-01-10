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
      <table id="dusts">
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
                <label htmlFor="ingredient_dusts">
                  <input
                    type="text"
                    id="ingredient_dusts"
                    name="ingredient_dusts"
                    placeholder="Enter ingredient"
                    value={input.ingredient_dusts}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weight_dusts">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_dusts"
                    name="weight_dusts"
                    placeholder="Enter weight (%)"
                    value={input.weight_dusts}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LC50_dusts">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LC50_dusts"
                    name="LC50_dusts"
                    placeholder="Enter LC50 (mg/l)"
                    value={input.LC50_dusts}
                    onChange={(e) => handleFormChange(e, idx)}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="limitdose_dusts">
                  <select
                    name="limitdose_dusts"
                    id="limitdose_dusts"
                    value={input.limitdose_dusts}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Limit Dose Data</option>
                    <option>&le; 0.05</option>
                    <option>&gt; 0.05 - &le; 0.5</option>
                    <option>&gt; 0.5 - &le; 1.0</option>
                    <option>&gt; 1.0 - &le; 5.0</option>
                    <option>&gt; 5.0 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td>
                <label htmlFor="classification_dusts">
                  <select
                    name="classification_dusts"
                    id="classification_dusts"
                    value={input.classification_dusts}
                    onChange={(e) => handleFormChange(e, idx)}
                  >
                    <option value="">Select Classification</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    <option>Not Classified (LC50 &gt; 5.0)</option>
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
                <label htmlFor="unknown_dusts" className="tooltip">
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
                id="unknown_dusts"
                name="unknown_dusts"
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