import React, { useState } from 'react';
import DermalInput from './DermalInput';
import { dermalPointEstimate } from './DermalLookup';
import { dermalCategory } from './DermalLookup';

const Dermal = ({
  dermalResult,
  setDermalResult,
  dermalResultCat,
  setDermalResultCat,
}) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDose: '',
      classification: '',
    },
  ]);

  const [unknown, setUnknown] = useState(null);

  let validated = false;
  let sum = 0;

  const handleFormChange = (event, idx) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const handleUnknownChange = (event) => {
    setUnknown(event.target.value);
  };

  const addFormFields = () => {
    validateRows();
    if (validated) {
      console.log(inputFields);
      let newfield = {
        ingredient: '',
        WT: '',
        LD50: '',
        limitDose: '',
        classification: '',
      };
      setInputFields([...inputFields, newfield]);
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    validateRows();
    //console.log(inputFields);
    if (validated) {
      //CALCULATIONS
      let d = [...inputFields];
      const results = d.map((obj) => {
        //Calculate LD50 values: if not empty, return weight/LD50 value
        if (obj.LD50 !== '') {
          //TODO: handle if LD50 > 5000 (ignore in calc?)
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
          //if Classification is Not Classified, set to 0 to ignore in calc
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
          //else handle null Point Estimate for No toxicity, set to 0 to ignore in calc
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

      //calculate result
      if (unknown > 10) {
        setDermalResult(Math.round((100 - unknown) / sum));
      } else {
        setDermalResult(Math.round(100 / sum));
      }

      if (!isFinite(dermalResult)) {
        //TODO: verify this
        setDermalResult('Not a Relevant Route of Exposure');
      }
      //lookup DermalResultsCat
      setDermalResultCat(dermalCategory(dermalResult));
      //console.log(dermalResultCat);
    } //end validated conditional
  };

  const removeRow = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const validateRows = () => {
    //validate last row before adding new row
    let data = [...inputFields];
    if (data.length > 0) {
      if (data[data.length - 1].ingredient === '') {
        alert('Ingredient is required in the last row.');
        return false;
      }
      if (data[data.length - 1].WT === '') {
        alert('Weight (WT) is required in the last row.');
        return false;
      }
      if (
        data[data.length - 1].LD50 === '' &&
        data[data.length - 1].limitDose === '' &&
        data[data.length - 1].classification === ''
      ) {
        alert(
          'LD50 or Limit Dose Data or Classification is required in the last row.'
        );
        return false;
      }
      if (
        !(
          data[data.length - 1].LD50 !== '' &&
          data[data.length - 1].limitDose === '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDose !== '' &&
          data[data.length - 1].classification === ''
        ) &&
        !(
          data[data.length - 1].LD50 === '' &&
          data[data.length - 1].limitDose === '' &&
          data[data.length - 1].classification !== ''
        )
      ) {
        alert(
          'Enter only one of LD50, Limit Dose Data, or Classification in the last row.'
        );
        return false;
      }
      validated = true;
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
        <button type="button" onClick={addFormFields}>
          Add Ingredient
        </button>{' '}
        &nbsp;
        <button type="button" onClick={calculate}>
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
