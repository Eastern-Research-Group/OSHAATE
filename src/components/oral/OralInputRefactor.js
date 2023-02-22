import React from 'react';
import { Tooltip } from '../Tooltip';
import { RemoveRow } from '../Utils';

const Input = ({
  inputFields,
  unknown,
  setUnknown,
  HandleFormChange,
  HandleUnknownChange,
  //RemoveRow,
  //Reset,
  setInputFields,
  category,
}) => {
  return (
    <div className="tablewrapper">
      <table id="oral">
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
            <tr key={idx} className={`row${idx}`}>
              <td>
                <label htmlFor="ingredient_oral">
                  <input
                    type="text"
                    id="ingredient_oral"
                    name="ingredient_oral"
                    placeholder="Enter ingredient"
                    value={input.ingredient_oral}
                    onChange={(e) =>
                      HandleFormChange(
                        e,
                        idx,
                        inputFields,
                        setInputFields,
                        category
                      )
                    }
                  />
                </label>
              </td>
              <td>
                <label htmlFor="weight_oral">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_oral"
                    name="weight_oral"
                    placeholder="Enter weight (%)"
                    value={input.weight_oral}
                    onChange={(e) =>
                      HandleFormChange(
                        e,
                        idx,
                        inputFields,
                        setInputFields,
                        category
                      )
                    }
                  />
                </label>
              </td>
              <td>
                <label htmlFor="LD50_oral">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LD50_oral"
                    name="LD50_oral"
                    placeholder="Enter LD50 (mg/kg)"
                    value={input.LD50_oral}
                    onChange={(e) =>
                      HandleFormChange(
                        e,
                        idx,
                        inputFields,
                        setInputFields,
                        category
                      )
                    }
                  />
                </label>
              </td>
              <td>
                <label htmlFor="limitdose_oral">
                  <select
                    name="limitdose_oral"
                    id="limitdose_oral"
                    value={input.limitdose_oral}
                    onChange={(e) =>
                      HandleFormChange(
                        e,
                        idx,
                        inputFields,
                        setInputFields,
                        category
                      )
                    }
                  >
                    <option value="">Select Limit Dose Data</option>
                    <option>&le; 5</option>
                    <option>&gt; 5 - &le; 50</option>
                    <option>&gt; 50 - &le; 300</option>
                    <option>&gt; 300 - &le; 2,000</option>
                    <option>&gt; 2,000 - &le; 5,000</option>
                    <option>&gt; 2,000 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td>
                <label htmlFor="classification_oral">
                  <select
                    name="classification_oral"
                    id="classification_oral"
                    value={input.classification_oral}
                    onChange={(e) =>
                      HandleFormChange(
                        e,
                        idx,
                        inputFields,
                        setInputFields,
                        category
                      )
                    }
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
                  <button
                    typ="button"
                    onClick={(e) =>
                      RemoveRow(e, idx, inputFields, setInputFields)
                    }
                  >
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
                position="top"
              >
                <label htmlFor="unknown_oral" className="tooltip">
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
                id="unknown_oral"
                name="unknown_oral"
                placeholder="Enter weight (%)"
                value={unknown}
                onChange={(e) => HandleUnknownChange(e, setUnknown)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
