import React, { useState } from 'react';
import DermalInput from './DermalInput';
import { dermalPointEstimate } from './DermalLookup';

const Dermal = ({ setDermalResult, setShowDermalResult }) => {
  const [dermalInputFields, setDermalInputFields] = useState([
    {
      ingredientDermal: '',
      weightDermal: '',
      LD50: '',
      limitDose: '',
      classification: '',
    },
  ]);

  let [unknown, setUnknown] = useState(null);

  const handleDermalFormChange = (event, idx) => {
    let data = [...dermalInputFields];
    //limit WT and LD50 input to 2 decimal places
    if (event.target.name === 'weightDermal' || event.target.name === 'LD50') {
      data[idx][event.target.name] = event.target.value.replace(
        /(?<=\.[0-9]{2}).+/g,
        ''
      );
    } else {
      data[idx][event.target.name] = event.target.value;
    }
    setDermalInputFields(data);
    //console.log(dermalInputFields);
  };

  const handleDermalUnknownChange = (event) => {
    setUnknown(event.target.value);
  };

  const validateRows = (e) => {
    let data = [...dermalInputFields];
    let formIsValid = true;

    if (!data[data.length - 1].ingredientDermal) {
      formIsValid = false;
      alert('Ingredient is required in row.');
    } else if (!data[data.length - 1].weightDermal) {
      formIsValid = false;
      alert('Weight (WT) is required in row.');
    } else if (
      !data[data.length - 1].LD50 &&
      !data[data.length - 1].limitDose &&
      !data[data.length - 1].classification
    ) {
      formIsValid = false;
      alert('LD50 or Limit Dose Data or Classification is required in row.');
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
        'Enter only one of LD50, Limit Dose Data, or Classification in row.'
      );
    } else {
      if (formIsValid && e.target.id === 'add') {
        addRow();
      }
      if (formIsValid && e.target.id === 'calculate') {
        calculate();
      }
    }
  };

  const addRow = () => {
    let newfield = {
      ingredientDermal: '',
      weightDermal: '',
      LD50: '',
      limitDose: '',
      classification: '',
    };
    setDermalInputFields([...dermalInputFields, newfield]);
  };

  const removeRow = (idx) => {
    let data = [...dermalInputFields];
    data.splice(idx, 1);
    setDermalInputFields(data);
  };

  const calculate = () => {
    let data = [...dermalInputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LD50 !== '' && parseFloat(obj.LD50) <= 5000) ||
          (obj.limitDose !== '' &&
            obj.limitDose !== '> 2,000 (No signs of toxicity)') ||
          (obj.classification !== '' &&
            obj.classification !== 'Not Classified (LD50 > 5,000)')
      )
      .map((obj) => {
        if (obj.LD50 !== '') {
          return {
            ...obj,
            LD50: parseFloat(obj.weightDermal) / parseFloat(obj.LD50),
          };
        }
        if (obj.limitDose !== '') {
          return {
            ...obj,
            limitDose:
              parseFloat(obj.weightDermal) /
              dermalPointEstimate('Limit Dose', obj.limitDose),
          };
        }
        if (obj.classification !== '') {
          return {
            ...obj,
            classification:
              parseFloat(obj.weightDermal) /
              dermalPointEstimate('Classification', obj.classification),
          };
        }
        return obj;
      });

    //console.log(results);

    const totalWTPercent = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weightDermal);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercent > 100) ||
        (unknown !== null && totalWTPercent + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
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
        if (unknown !== null && unknown > 10) {
          setDermalResult(Math.round((100 - unknown) / sum));
        } else {
          setDermalResult(Math.round(100 / sum));
        }
      } else {
        setDermalResult(null);
      }
      setShowDermalResult(true);
    } else {
      alert('Total weight to be calculated must not be greater than 100%.');
      setShowDermalResult(false);
    }
  };

  return (
    <form>
      <DermalInput
        dermalInputFields={dermalInputFields}
        handleDermalFormChange={handleDermalFormChange}
        handleDermalUnknownChange={handleDermalUnknownChange}
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

export default Dermal;
