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
      <table id="vapors">
        <thead>
          <tr>
            <th>
              Ingredient <Tooltip text="ingredient" />
            </th>
            <th>
              WT% <Tooltip text="WT" />
            </th>
            <th>
              LC<sub>50</sub> (mg/l) <Tooltip text="LC50mglvapors" />
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
                <label htmlFor={`ingredient_vapors-${idx}`}>
                  <input
                    type="text"
                    id={`ingredient_vapors-${idx}`}
                    name="ingredient_vapors"
                    placeholder="Enter ingredient"
                    value={input.ingredient_vapors}
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
                <label htmlFor={`weight_vapors-${idx}`}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id={`weight_vapors-${idx}`}
                    name="weight_vapors"
                    placeholder="Enter weight (%)"
                    value={input.weight_vapors}
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
                <label htmlFor={`LDLC50_vapors-${idx}`}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id={`LDLC50_vapors-${idx}`}
                    name="LDLC50_vapors"
                    placeholder="Enter LC50 (mg/l)"
                    value={input.LDLC50_vapors}
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
                <label htmlFor={`limitdose_vapors-${idx}`}>
                  <select
                    name="limitdose_vapors"
                    id={`limitdose_vapors-${idx}`}
                    value={input.limitdose_vapors}
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
                    <option>&le; 0.5</option>
                    <option>&gt; 0.5 - &le; 2.0</option>
                    <option>&gt; 2.0 - &le; 10.0</option>
                    <option>&gt; 10.0 - &le; 20.0</option>
                    <option>&gt; 20.0 (No signs of toxicity)</option>
                  </select>
                </label>
              </td>
              <td>
                <label htmlFor={`classification_vapors-${idx}`}>
                  <select
                    name="classification_vapors"
                    id={`classification_vapors-${idx}`}
                    value={input.classification_vapors}
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
                    <option>Not Classified (LC50 &gt; 20.0)</option>
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
              <label htmlFor="unknown_vapors" className="tooltip">
                Sum Unknown Toxicity <Tooltip text="unknown" />
              </label>
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
