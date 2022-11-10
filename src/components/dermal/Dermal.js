import React, { useState } from 'react';
import DermalInput from './DermalInput';
import { dermalPointEstimate } from './DermalLookup';

const Dermal = ({ setDermalResult, dermalResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDose: '',
      classification: '',
    },
  ]);

  let [unknown, setUnknown] = useState(null);

  const handleFormChange = (event, idx) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const handleUnknownChange = (event) => {
    setUnknown(event.target.value);
  };

  const validateRows = (e) => {
    e.preventDefault();
    let data = [...inputFields];
    let formIsValid = true;

    if (!data[data.length - 1].ingredient) {
      formIsValid = false;
      alert('Ingredient is required in the last row.');
    } else if (!data[data.length - 1].WT) {
      formIsValid = false;
      alert('Weight (WT) is required in the last row.');
    } else if (
      !data[data.length - 1].LD50 &&
      !data[data.length - 1].limitDose &&
      !data[data.length - 1].classification
    ) {
      formIsValid = false;
      alert(
        'LD50 or Limit Dose Data or Classification is required in the last row.'
      );
    } else if (
      !(
        data[data.length - 1].LD50 &&
        !data[data.length - 1].limitDose &&
        !data[data.length - 1].classification
      ) &&
      !(
        !data[data.length - 1].LD50 &&
        data[data.length - 1].limitDose &&
        !data[data.length - 1].classification
      ) &&
      !(
        !data[data.length - 1].LD50 &&
        !data[data.length - 1].limitDose &&
        data[data.length - 1].classification
      )
    ) {
      formIsValid = false;
      alert(
        'Enter only one of LD50, Limit Dose Data, or Classification in the last row.'
      );
    } else {
      //return formIsValid;
      //console.log(formIsValid);
      if (formIsValid && e.target.id === 'add') {
        addRow();
      }
      if (formIsValid && e.target.id === 'calculate') {
        calculate();
      }
    }
  };

  const addRow = () => {
    //console.log(inputFields);
    let newfield = {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDose: '',
      classification: '',
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeRow = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const calculate = () => {
    let d = [...inputFields];
    let sum = 0;
    let results = d.map((obj) => {
      //Calculate LD50 values: if not empty, return weight/LD50 value
      if (obj.LD50 !== '') {
        //handle if LD50 > 5000
        if (!(parseFloat(obj.LD50) > 5000)) {
          return {
            ...obj,
            LD50: parseFloat(obj.WT) / parseFloat(obj.LD50),
          };
        }
        //if LD50 > 5000, set to 0 to ignore in calc?
        else {
          return {
            ...obj,
            LD50: 0,
          };
        }
      }

      //Calculate Classification values: if not empty, return weight/point estimate
      if (obj.classification !== '') {
        //handle if Classification is Not Classified
        if (obj.classification !== 'Not Classified (LD50 > 5,000)') {
          return {
            ...obj,
            classification:
              parseFloat(obj.WT) /
              dermalPointEstimate('Classification', obj.classification),
          };
        }
        //if Classification is Not Classified, set to 0 to ignore in calc?
        else {
          return {
            ...obj,
            classification: 0,
          };
        }
      }
      //Calculate Limit Dose values: if not empty, return weight/point estimate
      if (obj.limitDose !== '') {
        //if not null Point Estimate
        if (
          !dermalPointEstimate('Limit Dose', obj.limitDose).every(
            (element) => element === null
          )
        ) {
          return {
            ...obj,
            limitDose:
              parseFloat(obj.WT) /
              dermalPointEstimate('Limit Dose', obj.limitDose),
          };
        }
        //else handle null Point Estimate for No toxicity, set to 0 to ignore in calc?
        else {
          return {
            ...obj,
            limitDose: 0,
          };
        }
      }
      return obj;
    });

    //console.log(results);
    results.forEach((item) => {
      if (item.LD50 !== '') {
        sum += item.LD50;
      }
      if (item.limitDose !== '') {
        sum += item.limitDose;
      }
      if (item.classification !== '') {
        sum += item.classification;
      }
    });

    console.log(results);

    //calculate result
    if (unknown !== null && unknown > 10) {
      //console.log('no unknown or unknown greater than 10');
      setDermalResult(Math.round((100 - unknown) / sum));
    } else {
      //console.log('no unknown or unknown less than 10');
      setDermalResult(Math.round(100 / sum));
    }
  };

  return (
    <div>
      <form onSubmit={calculate}>
        <DermalInput
          inputFields={inputFields}
          handleFormChange={handleFormChange}
          handleUnknownChange={handleUnknownChange}
          removeRow={removeRow}
        />
        <br />
        <button type="button" id="add" onClick={validateRows}>
          Add Ingredient
        </button>{' '}
        &nbsp;
        <button type="button" id="calculate" onClick={validateRows}>
          Calculate
        </button>
        {/*{this.state.rows.length === 1 ? null : (
          <button onClick={this.handleRemoveRow}>Delete Last Row</button>
        )}*/}
      </form>
    </div>
  );
};

export default Dermal;
