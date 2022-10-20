import React from "react";

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

class DermalInput extends React.Component {
  state = {
    rows: [{}],
  };
  handleChange = (idx) => (e) => {
    //TODO: onchange error
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
    //console.log(rows[0].ingredient);
    console.log(this.state.rows); //TODO: only outputting last changed value as single, see https://codesandbox.io/s/3vk7jxv69p
  };
  handleAddRow = () => {
    const item = {
      ingredient: "",
      WT: "",
      LD50: "",
      limitDoseData: "",
      classification: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  /*handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };*/
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };
  handleCalculation = () => {};
  render() {
    //console.log(this.state.rows.length);
    return (
      <div>
        <table id="dermal">
          <thead>
            <tr>
              {/*<th>#</th>*/}
              <th>Ingredient</th>
              <th>WT%</th>
              <th>LD50 (mg/kg)</th>
              <th>Limit Dose Data (mg/kg)</th>
              <th>Classification (mg/kg)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((item, idx) => (
              <tr id="addr0" key={idx}>
                {/*<td>{idx}</td>*/}
                <td>
                  <input
                    type="text"
                    name="ingredient"
                    required="required"
                    value={this.state.rows[idx].ingredient} // || "" resolves onchange error, but makes inputs mutually exclusive
                    onChange={this.handleChange(idx)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="WT"
                    required="required"
                    value={this.state.rows[idx].WT} // || "" resolves onchange error, but makes inputs mutually exclusive
                    onChange={this.handleChange(idx)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="LD50"
                    value={this.state.rows[idx].LD50} // || "" resolves onchange error, but makes inputs mutually exclusive
                    onChange={this.handleChange(idx)}
                  />
                </td>
                <td>
                  <select
                    name="limitDoseData"
                    value={this.state.rows[idx].limitDoseData}
                    onChange={this.handleChange(idx)}
                  >
                    <option>&le; 50</option>
                    <option>&gt; 50 - &le; 200</option>
                    <option>&gt; 200 - &le; 1,000</option>
                    <option>&gt; 1,000 - &le; 2,000</option>
                    <option>&gt; 2,000 - &le; 5,000</option>
                    <option>&gt; 2,000 (No signs of toxicity)</option>
                  </select>
                </td>
                <td>
                  <select
                    name="classification"
                    value={this.state.rows[idx].classification}
                    onChange={this.handleChange(idx)}
                  >
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    <option>Category 5</option>
                    <option>Not Classified (LD50 &gt; 5,000)</option>
                  </select>
                </td>
                <td>
                  {idx === 0 ? null : (
                    <button onClick={this.handleRemoveSpecificRow(idx)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div>
          <label className="text-bold">* Combined Unknown (%)</label>
          <input type="text" />
        </div>
        <br />
        {/*NOTE: does this get added with add row?*/}
        <button onClick={this.handleAddRow}>Add Row</button> &nbsp;
        <button type="submit" onClick={this.handleCalculation}>
          Calculate
        </button>
        {/*{this.state.rows.length === 1 ? null : (
          <button onClick={this.handleRemoveRow}>Delete Last Row</button>
        )}*/}
      </div>
    );
  }
}

export default DermalInput;
