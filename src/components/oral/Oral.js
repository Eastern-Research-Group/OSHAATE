import React, { useState } from 'react';
import OralInput from './OralInput';
//import { dermalPointEstimate } from './DermalLookup';

const Oral = ({ setOralResult, oralResult }) => {
  const [inputFields, setInputFields] = useState([
    { ingredient: '', WT: '', toxicity: '' },
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
      alert('Ingredient is required in row.');
    } else if (!data[data.length - 1].WT) {
      formIsValid = false;
      alert('Weight (WT) is required in row.');
    } else if (!data[data.length - 1].toxicity) {
      formIsValid = false;
      alert('Available toxicity is required in row.');
    } else {
      //return formIsValid;
      if (formIsValid && e.target.id === 'add') {
        addRow();
      }

      /*const totalWTPercent = data.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.WT);
      }, 0);

      if (formIsValid && e.target.id === 'calculate') {
        if (
          (!unknown && totalWTPercent === 100) ||
          (unknown && totalWTPercent + parseFloat(unknown) === 100)
        ) {
          calculate();
        } else {
          alert('Total weight entered must be equal to 100%');
        }
      }*/
    }
  };

  const addRow = () => {
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

  //TODO: FOR ORAL
  /*const calculate = () => {
    let d = [...inputFields];
    let sum = 0;
    let results = d.map((obj) => {
      //Calculate LD50 values: if not empty, return weight/LD50 value
      //NOTE: LD50 values > 5,000 not in any GHS Dermal Acute Category, don't calculate?
      if (obj.LD50 !== '') {
        return {
          ...obj,
          LD50: parseFloat(obj.WT) / parseFloat(obj.LD50),
        };
      }
      //Calculate Classification values: if not empty, return weight/point estimate
      //NOTE: there is no point estimate for Not Classified (LD50 > 5,000), WT cannot be divided by 0
      if (obj.classification !== '') {
        return {
          ...obj,
          classification:
            parseFloat(obj.WT) /
            dermalPointEstimate('Classification', obj.classification),
        };
      }
      //Calculate Limit Dose values: if not empty, return weight/point estimate
      //NOTE: there is no point estimate for > 2,000 (No signs of toxicity), WT cannot be divided by 0
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

    //sum
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

    //console.log(results);

    //calculate result
    if (unknown !== null && unknown > 10) {
      setDermalResult(Math.round((100 - unknown) / sum));
    } else {
      setDermalResult(Math.round(100 / sum));
    }
  };*/

  return (
    <form>
      <OralInput
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
    </form>
  );
};

export default Oral;
