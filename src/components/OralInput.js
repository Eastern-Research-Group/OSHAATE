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

class OralInput extends React.Component {
  state = {
    rows: [{}],
  };
  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleAddRow = () => {
    const item = {
      ingredient: "",
      WT: "",
      toxicity: "",
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
            {this.state.rows.map((item, idx) => (
              <tr id="addr0" key={idx}>
                {/*<td>{idx}</td>*/}
                <td>
                  <input
                    type="text"
                    name="ingredient"
                    required="required"
                    value={this.state.rows[idx].ingredient || ""}
                    onChange={this.handleChange(idx)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    name="WT"
                    required="required"
                    value={this.state.rows[idx].WT || ""}
                    onChange={this.handleChange(idx)}
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    name="toxicity"
                    value={this.state.rows[idx].toxicity}
                    onChange={this.handleChange(idx)}
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
        <button onClick={this.handleCalculation}>Calculate</button>
        {/*{this.state.rows.length === 1 ? null : (
          <button onClick={this.handleRemoveRow}>Delete Last Row</button>
        )}*/}
      </div>
    );
  }
}

export default OralInput;
