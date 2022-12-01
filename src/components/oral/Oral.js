import React, { useState } from 'react';
import OralInput from './OralInput';
import { oralPointEstimate } from './OralLookup';

const Oral = ({ setOralResult, setShowOralResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_oral: '',
      weight_oral: '',
      LD50_oral: '',
      limitdose_oral: '',
      classification_oral: '',
    },
  ]);

  let [unknown, setUnknown] = useState(null);

  const handleFormChange = (event, idx) => {
    let data = [...inputFields];
    //limit WT input to 2 decimal places
    if (
      event.target.name === 'weight_oral' ||
      event.target.name === 'LD50_oral'
    ) {
      data[idx][event.target.name] = event.target.value.replace(
        /(?<=\.[0-9]{2}).+/g,
        ''
      );
    } else {
      data[idx][event.target.name] = event.target.value;
    }
    setInputFields(data);
  };

  const handleUnknownChange = (event) => {
    setUnknown(event.target.value);
  };

  const validateRows = (e) => {
    e.preventDefault();
    let data = [...inputFields];
    let formIsValid = true;
    data.forEach((item) => {
      if (!item.ingredient_oral) {
        formIsValid = false;
        alert('Ingredient is required in row.');
      } else if (!item.weight_oral) {
        formIsValid = false;
        alert('Weight (WT) is required in row.');
      } else if (
        !item.LD50_oral &&
        !item.limitdose_oral &&
        !item.classification_oral
      ) {
        formIsValid = false;
        alert('LD50 or Limit Dose Data or Classification is required in row.');
      } else if (
        !(
          item.LD50_oral &&
          !item.limitdose_oral &&
          !item.classification_oral
        ) &&
        !(
          !item.LD50_oral &&
          item.limitdose_oral &&
          !item.classification_oral
        ) &&
        !(!item.LD50_oral && !item.limitdose_oral && item.classification_oral)
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
      ingredient_oral: '',
      weight_oral: '',
      LD50_oral: '',
      limitdose_oral: '',
      classification_oral: '',
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeRow = (idx) => {
    let data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  //TODO: CUSTOMIZE FOR ORAL
  const calculate = (e) => {
    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LD50_oral !== '' && parseFloat(obj.LD50_oral) <= 5000) ||
          (obj.limitdose_oral !== '' &&
            obj.limitdose_oral !== '> 2,000 (No signs of toxicity)') ||
          (obj.classification_oral !== '' &&
            obj.classification_oral !== 'Not Classified (LD50 > 5,000)')
      )
      .map((obj) => {
        if (obj.LD50_oral !== '') {
          return {
            ...obj,
            LD50_oral: parseFloat(obj.weight_oral) / parseFloat(obj.LD50_oral),
          };
        }
        if (obj.limitdose_oral !== '') {
          return {
            ...obj,
            limitdose_oral:
              parseFloat(obj.weight_oral) /
              oralPointEstimate('Limit Dose', obj.limitdose_oral),
          };
        }
        if (obj.classification_oral !== '') {
          return {
            ...obj,
            classification_oral:
              parseFloat(obj.weight_oral) /
              oralPointEstimate('Classification', obj.classification_oral),
          };
        }
        return obj;
      });

    //console.log(results);

    const totalWTPercentOral = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_oral);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercentOral > 100) ||
        (unknown !== null && totalWTPercentOral + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
        results.forEach((item) => {
          if (item.LD50_oral !== '') {
            sum += item.LD50_oral;
          }
          if (item.limitdose_oral !== '') {
            sum += item.limitdose_oral;
          }
          if (item.classification_oral !== '') {
            sum += item.classification_oral;
          }
        });
        //calculate result
        if (unknown !== null && unknown > 10) {
          setOralResult(Math.round((100 - unknown) / sum));
        } else {
          setOralResult(Math.round(100 / sum));
        }
      } else {
        setOralResult(null);
      }
      setShowOralResult(true);
    } else {
      alert('Total weight to be calculated must not be greater than 100%.');
      setShowOralResult(false);
    }
  };

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
