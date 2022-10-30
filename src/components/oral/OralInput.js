import React from "react";
import { useState } from "react";

//TODO: Remove Arrows/Spinners for number type input
///* Chrome, Safari, Edge, Opera */
/*input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}*/
/* Firefox */
/*input[type=number] {
  -moz-appearance: textfield;
}*/

function OralInput() {
  const [inputFields, setInputFields] = useState([
    { ingredient: "", WT: "", toxicity: "" },
  ]);

  const handleChange = (idx, event) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      ingredient: "",
      WT: "",
      toxicity: "",
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };
  return (
    <div>
      <form onSubmit={submit}>
        <table id="oral">
          <thead>
            <tr>
              {/*<th>#</th>*/}
              <th>Ingredient</th>
              <th>WT%</th>
              <th>Available Toxicity Data</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((input, idx) => (
              <tr id="addr0" key={idx}>
                {/*<td>{idx}</td>*/}
                <td>
                  <input
                    type="text"
                    name="ingredient"
                    required="required"
                    value={input.ingredient}
                    onChange={(event) => handleChange(idx, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="WT"
                    required="required"
                    value={input.WT}
                    onChange={(event) => handleChange(idx, event)}
                  />
                </td>
                <td>
                  <select
                    name="toxicity"
                    value={input.toxicity}
                    onChange={(event) => handleChange(idx, event)}
                  >
                    <option>0 &lt; Category 1 &le; 5</option>
                    <option>5 &lt; Category 2 &le; 50</option>
                    <option>50 &lt; Category 3 &le; 300</option>
                    <option>300 &lt; Category 4 &le; 2,000</option>
                    <option>2,000 &lt; Category 5 &le; 5,000</option>
                  </select>
                </td>
                <td>
                  {idx === 0 ? null : (
                    <button onClick={() => removeFields(idx)}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <label>
                  <input type="text" placeholder="Combined Unknown" />
                </label>
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div></div>
        <br />
        <button onClick={addFields}>Add Row</button> &nbsp;
        <button type="submit" onClick={submit}>
          Calculate
        </button>
      </form>
    </div>
  );
}

export default OralInput;
