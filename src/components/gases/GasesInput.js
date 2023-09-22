import React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { RemoveRow } from '../Utils';

const Input = ({
  inputFields,
  HandleFormChange,
  setInputFields,
  category,
  unknown,
  setUnknown,
  handleUnknownChange,
}) => {
  return (
    <div className="tablewrapper">
      <table id="gases">
        <thead>
          <tr>
            <th>
              Ingredient <Tooltip text="ingredient" />
            </th>
            <th>
              WT% <Tooltip text="WT" />
            </th>
            <th>
              LC<sub>50</sub> (ppmV) <Tooltip text="LC50ppm" />
            </th>
            <th>
              Limit Dose Data (mg/kg) <Tooltip text="limitdose" />
            </th>
            <th>
              Classification <Tooltip text="classification" />
            </th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx} className={`row${idx}`}>
              <td>
                <label htmlFor={`ingredient_gases-${idx}`}>
                  <input
                    id={`ingredient_gases-${idx}`}
                    name="ingredient_gases"
                    type="text"
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
                <label htmlFor={`weight_gases-${idx}`}>
                  <input
                    id={`weight_gases-${idx}`}
                    name="weight_gases"
                    type="number"
                    min="0"
                    step="0.01"
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
                <label htmlFor={`LDLC50_gases-${idx}`}>
                  <input
                    id={`LDLC50_gases-${idx}`}
                    name="LDLC50_gases"
                    type="number"
                    min="0"
                    step="0.01"
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
                <label htmlFor={`limitdose_gases-${idx}`}>
                  <select
                    id={`limitdose_gases-${idx}`}
                    name="limitdose_gases"
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
                <label htmlFor={`classification_gases-${idx}`}>
                  <select
                    id={`classification_gases-${idx}`}
                    name="classification_gases"
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
                Sum Unknown Toxicity <Tooltip text="unknown" />
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
                onChange={(e) => handleUnknownChange(e, setUnknown)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
