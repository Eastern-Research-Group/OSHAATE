import React from 'react';
import { useState } from 'react';
import DermalInput from './DermalInput';
import { dermalPointEstimate } from '../Lookups';

const Dermal = ({ dermalResult, setDermalResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient: '',
      WT: '',
      LD50: '',
      limitDose: '',
      classification: '',
    },
  ]);

  let validated = false;

  const handleFormChange = (idx, event) => {
    let data = [...inputFields];
    data[idx][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFormFields = () => {
    validateRows();
    if (validated) {
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
      //console.log(inputFields);
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
          return {
            ...obj,
            LD50: parseFloat(obj.WT) / parseFloat(obj.LD50),
          };
        }
        //Calculate Classification values: if not empty, return weight/point estimate
        if (obj.classification !== '') {
          return {
            ...obj,
            classification:
              parseFloat(obj.WT) /
              dermalPointEstimate('Classification', obj.classification),
          };
        }
        //Calculate Limit Dose values: if not empty, return weight/point estimate
        if (obj.limitDose !== '') {
          return {
            ...obj,
            limitDose:
              parseFloat(obj.WT) /
              dermalPointEstimate('Limit Dose', obj.limitDose),
          };
        }
        return obj;
      });

      //console.log(results);
      let sum = 0;
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
      //calculated value to pass to DermalResults component
      setDermalResult(Math.round(100 / sum));

      //TODO: get DermResultsCat value to pass to DermResults component
      //https://stackoverflow.com/questions/38056887/javascript-object-find-a-key-value-when-in-range
      //function getValue(search) {
      /*for (let range in dermalPointEstimateLookup[0]) {
          let split = range.split('-');
          console.log(split);
          if (
            search >= parseInt(split[0]) &&
            search <= parseInt(split[1] || split[0])
          )
            return 'test'; //dermalPointEstimateLookup('Classification', dermalResult);
            //dermalPointEstimateLookup('Range')
        }
      //}*/
      //console.log(dermalPointEstimateLookup.lookup[0]);
      //setDermalResultCat(getValue(dermalResult));
    } //end validated conditional
  };

  //console.log(dermalResultCat);

  const removeFormFields = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  return (
    <div>
      <form onSubmit={calculate}>
        <DermalInput
          inputFields={inputFields}
          handleFormChange={handleFormChange}
          removeFormFields={removeFormFields}
        />
        <br />
        <button type="button" onClick={addFormFields}>
          Add Row
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
