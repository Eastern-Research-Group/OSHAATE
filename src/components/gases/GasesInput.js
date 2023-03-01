import React, { useState } from 'react';
import { Tooltip } from '../Tooltip';
import { HandleUnknownChange, RemoveRow } from '../Utils';

const Input = ({
  inputFields,
  HandleFormChange,
  setInputFields,
  category,
  //unknown,
  //setUnknown,
  //HandleUnknownChange,
}) => {
  let [unknown, setUnknown] = useState('');
  return (
    <div className="tablewrapper">
      <table id="gases">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>WT%</th>
            <th>
              LC<sub>50</sub> (ppmV)
            </th>
            <th>Limit Dose Data (mg/kg)</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx} className={`row${idx}`}>
              <td>
                <label htmlFor="ingredient_gases">
                  <input
                    type="text"
                    id="ingredient_gases"
                    name="ingredient_gases"
                    placeholder="Enter ingredient"
                    value={input.ingredient_gases}
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
                <label htmlFor="weight_gases">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="weight_gases"
                    name="weight_gases"
                    placeholder="Enter weight (%)"
                    value={input.weight_gases}
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
                <label htmlFor="LDLC50_gases">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id="LDLC50_gases"
                    name="LDLC50_gases"
                    placeholder="Enter LC50 (ppmV)"
                    value={input.LDLC50_gases}
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
                <label htmlFor="limitdose_gases">
                  <select
                    name="limitdose_gases"
                    id="limitdose_gases"
                    value={input.limitdose_gases}
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
                    <option>Not Classified (LC50 &gt; 20,000)</option>
                  </select>
                </label>
              </td>
              <td>
                {idx === 0 ? null : (
                  <button
                    type="button"
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
              <label htmlFor="unknown_gases" className="tooltip">
                Sum Unknown Toxicity{' '}
                <span>
                  <Tooltip>&#9432;</Tooltip>
                </span>
              </label>
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
                onChange={(e) =>
                  HandleUnknownChange(e, category, unknown, setUnknown)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
