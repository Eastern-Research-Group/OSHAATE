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
      <table id="oral">
      <caption>Oral Route</caption>
        <thead>
          <tr>
            <th scope="col">
              Ingredient <Tooltip text="ingredient" />
            </th>
            <th scope="col">
              WT% <Tooltip text="WT" />
            </th>
            <th scope="col">
              LD<sub>50</sub> (mg/kg) <Tooltip text="LD50" />
            </th>
            <th scope="col">
              Limit Dose Data (mg/kg) <Tooltip text="limitdose" />
            </th>
            <th scope="col">
              Classification <Tooltip text="classification" />
            </th>
          </tr>
        </thead>
        <tbody>
          {inputFields.map((input, idx) => (
            <tr key={idx} className={`row${idx}`}>
              <td>
             <label htmlFor={`ingredient_oral-${idx}`} aria-label="Enter ingredient">
                  <input
                    type="text"
                    id={`ingredient_oral-${idx}`}
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
                <label htmlFor={`weight_oral-${idx}`} aria-label="Enter weight (%)">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id={`weight_oral-${idx}`}
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
                <label htmlFor={`LDLC50_oral-${idx}`} aria-label="Enter LD50 (mg/kg)">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    id={`LDLC50_oral-${idx}`}
                    name="LDLC50_oral"
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
                <label htmlFor={`limitdose_oral-${idx}`}>
                  <select
                    name="limitdose_oral"
                    aria-label="Select Limit Dose Data"
                    id={`limitdose_oral-${idx}`}
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
                <label htmlFor={`classification_oral-${idx}`}>
                  <select
                    name="classification_oral"
                    aria-label="Select Classification"
                    id={`classification_oral-${idx}`}
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
              <label htmlFor="unknown_oral" className="tooltip">
                Sum Unknown Toxicity <Tooltip text="unknown" />
              </label>
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
