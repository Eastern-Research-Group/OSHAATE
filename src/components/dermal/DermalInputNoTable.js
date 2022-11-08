import React from 'react'; //, { useState }

const DermalInputNoTable = ({
  inputFields,
  handleFormChange,
  removeFormFields,
}) => {
  /*const [checked, setChecked] = useState(false);

  function toggle(value) {
    return !value;
  }*/

  return (
    <section className="table">
      <header className="no-style-break">
        <div className="tr">
          <span className="th"></span>
          <span className="th">Ingredient</span>
          <span className="th">WT%</span>
          <span className="th">LD50 (mg/kg)</span>
          <span className="th">Limit Dose Data (mg/kg)</span>
          <span className="th">Classification (mg/kg)</span>
          <span className="th">Unknown</span>
        </div>
      </header>
      <div className="tbody">
        {inputFields.map((input, i) => (
          <div className="tr" key={i}>
            <span>
              <span className="title">
                <br className="no-style-break" />
              </span>
              Mix {i + 1} <br className="no-style-break" />
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                Ingredient <br className="no-style-break" />
              </span>
              <label htmlFor="ingredient1">
                <input
                  type="text"
                  id="ingredient1"
                  name="ingredient"
                  placeholder="Enter ingredient"
                  value={input.ingredient}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </label>
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                WT% <br className="no-style-break" />
              </span>
              <label htmlFor="WT1">
                <input
                  type="number"
                  id="WT1"
                  min="0"
                  name="WT"
                  placeholder="Enter weight (%)"
                  value={input.WT}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </label>
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                LD50 (mg/kg) <br className="no-style-break" />
              </span>
              <label htmlFor="LD501">
                <input
                  type="number"
                  id="LD501"
                  min="0"
                  name="LD50"
                  placeholder="Enter LD50 (mg/kg)"
                  value={input.LD50}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </label>
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                Limit Dose Data (mg/kg) <br className="no-style-break" />
              </span>
              <label htmlFor="limitDose1">
                <select
                  name="limitDose"
                  id="limitDose1"
                  value={input.limitDose}
                  onChange={(event) => handleFormChange(i, event)}
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
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                Classification (mg/kg) <br className="no-style-break" />
              </span>
              <label htmlFor="classification1">
                <select
                  name="classification"
                  id="classification1"
                  value={input.classification}
                  onChange={(event) => handleFormChange(i, event)}
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
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                Unknown <br className="no-style-break" />
              </span>
              <label htmlFor="unknown1">
                <input
                  type="checkbox"
                  id="unknown1"
                  name="unknown"
                  onChange={(event) => handleFormChange(i, event)}
                />
              </label>
            </span>
            <br className="no-style-break" />
            <br className="no-style-break" />
            <span>
              <span className="title">
                <br className="no-style-break" />
              </span>
              {i === 0 ? null : (
                <button onClick={() => removeFormFields(i)}>Remove</button>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DermalInputNoTable;
