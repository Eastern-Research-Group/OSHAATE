import React, { useState } from 'react';
import DermalInput from './DermalInput';
import { dermalPointEstimate } from './DermalLookup';

const Dermal = ({ setDermalResult, setShowDermalResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_dermal: '',
      weight_dermal: '',
      LD50_dermal: '',
      limitdose_dermal: '',
      classification_dermal: '',
    },
  ]);

  let [unknown, setUnknown] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT and LD50 input to 2 decimal places
    if (e.target.name === 'weight_dermal' || e.target.name === 'LD50_dermal') {
      data[idx][e.target.name] = e.target.value.replace(
        /(?<=\.[0-9]{2}).+/g,
        ''
      );
    } else {
      data[idx][e.target.name] = e.target.value;
    }
    setInputFields(data);
    //console.log(inputFields);
  };

  const handleUnknownChange = (e) => {
    setUnknown(e.target.value);
  };

  const validateRows = (e) => {
    e.preventDefault();
    let data = [...inputFields];
    let formIsValid = true;
    data.forEach((item) => {
      if (!item.ingredient_dermal) {
        formIsValid = false;
        alert('Ingredient is required in row.');
      } else if (!item.weight_dermal) {
        formIsValid = false;
        alert('Weight (WT) is required in row.');
      } else if (
        !item.LD50_dermal &&
        !item.limitdose_dermal &&
        !item.classification_dermal
      ) {
        formIsValid = false;
        alert('LD50 or Limit Dose Data or Classification is required in row.');
      } else if (
        !(
          item.LD50_dermal &&
          !item.limitdose_dermal &&
          !item.classification_dermal
        ) &&
        !(
          !item.LD50_dermal &&
          item.limitdose_dermal &&
          !item.classification_dermal
        ) &&
        !(
          !item.LD50_dermal &&
          !item.limitdose_dermal &&
          item.classification_dermal
        )
      ) {
        formIsValid = false;
        alert(
          'Enter only one of LD50, Limit Dose Data, or Classification in row.'
        );
      }
    });

    if (formIsValid && e.target.id === 'add') {
      addRow();
    }
    if (formIsValid && e.target.id === 'calculate') {
      calculate();
    }
  };

  const addRow = () => {
    let newfield = {
      ingredient_dermal: '',
      weight_dermal: '',
      LD50_dermal: '',
      limitdose_dermal: '',
      classification_dermal: '',
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeRow = (e, idx) => {
    e.preventDefault();
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const reset = (e) => {
    e.preventDefault();
    let data = [...inputFields];
    data.splice(1);
    setInputFields([
      {
        ingredient_dermal: '',
        weight_dermal: '',
        LD50_dermal: '',
        limitdose_dermal: '',
        classification_dermal: '',
      },
    ]);
    setUnknown('');
    setShowDermalResult(false);
  };

  const calculate = () => {
    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LD50_dermal !== '' && parseFloat(obj.LD50_dermal) <= 5000) ||
          (obj.limitdose_dermal !== '' &&
            obj.limitdose_dermal !== '> 2,000 (No signs of toxicity)') ||
          (obj.classification_dermal !== '' &&
            obj.classification_dermal !== 'Not Classified (LD50 > 5,000)')
      )
      .map((obj) => {
        if (obj.LD50_dermal !== '') {
          return {
            ...obj,
            LD50_dermal:
              parseFloat(obj.weight_dermal) / parseFloat(obj.LD50_dermal),
          };
        }
        if (obj.limitdose_dermal !== '') {
          return {
            ...obj,
            limitdose_dermal:
              parseFloat(obj.weight_dermal) /
              dermalPointEstimate('Limit Dose', obj.limitdose_dermal),
          };
        }
        if (obj.classification_dermal !== '') {
          return {
            ...obj,
            classification_dermal:
              parseFloat(obj.weight_dermal) /
              dermalPointEstimate('Classification', obj.classification_dermal),
          };
        }
        return obj;
      });

    //console.log(results);

    const totalWTPercentDermal = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_dermal);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercentDermal > 100) ||
        (unknown !== null && totalWTPercentDermal + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
        results.forEach((item) => {
          if (item.LD50_dermal !== '') {
            sum += item.LD50_dermal;
          }
          if (item.limitdose_dermal !== '') {
            sum += item.limitdose_dermal;
          }
          if (item.classification_dermal !== '') {
            sum += item.classification_dermal;
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
        inputFields={inputFields}
        unknown={unknown}
        handleFormChange={handleFormChange}
        handleUnknownChange={handleUnknownChange}
        removeRow={removeRow}
      />
      <br />
      <button type="button" id="add" onClick={validateRows}>
        Add Ingredient
      </button>{' '}
      <button type="button" id="reset" onClick={reset}>
        Reset
      </button>{' '}
      <button type="button" id="calculate" onClick={validateRows}>
        Calculate
      </button>
    </form>
  );
};

export default Dermal;
