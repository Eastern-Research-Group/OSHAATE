import React, { useState } from 'react';
import OralInput from './OralInput';
//import { dermalPointEstimate } from './DermalLookup';

const Oral = ({ setOralResult, setShowOralResult }) => {
  const [oralInputFields, setOralInputFields] = useState([
    { ingredientOral: '', weightOral: '', toxicity: '' },
  ]);

  let [unknown, setUnknown] = useState(null);

  const handleOralFormChange = (event, idx) => {
    let data = [...oralInputFields];
    //limit WT input to 2 decimal places
    if (event.target.name === 'weightOral') {
      data[idx][event.target.name] = event.target.value.replace(
        /(?<=\.[0-9]{2}).+/g,
        ''
      );
    } else {
      data[idx][event.target.name] = event.target.value;
    }
    setOralInputFields(data);
  };

  const handleOralUnknownChange = (event) => {
    setUnknown(event.target.value);
  };

  const validateRows = (e) => {
    e.preventDefault();
    let data = [...oralInputFields];
    let formIsValid = true;

    if (!data[data.length - 1].ingredientOral) {
      formIsValid = false;
      alert('Ingredient is required in row.');
    } else if (!data[data.length - 1].weightOral) {
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

      const totalWTPercent = data.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.weightOral);
      }, 0);

      if (formIsValid && e.target.id === 'calculate') {
        if (
          !(!unknown && totalWTPercent > 100) ||
          (unknown && totalWTPercent + parseFloat(unknown) > 100)
        ) {
          /*calculate();*/ console.log('calculate');
        } else {
          alert('Total weight entered must not be greater than 100%.');
        }
      }
    }
  };

  const addRow = () => {
    let newfield = {
      ingredientOral: '',
      weightOral: '',
      toxicity: '',
    };
    setOralInputFields([...oralInputFields, newfield]);
  };

  const removeRow = (idx) => {
    let data = [...oralInputFields];
    data.splice(idx, 1);
    setOralInputFields(data);
  };

  //TODO: CUSTOMIZE FOR ORAL
  /*const calculate = () => {
    let data = [...oralInputFields];
    let sum = 0;
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
              parseFloat(obj.weight.Dermal) /
              dermalPointEstimate('Classification', obj.classification),
          };
        }
        return obj;
      });

    //console.log(results);

    //sum
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
        setOralResult(Math.round((100 - unknown) / sum));
      } else {
        setOralResult(Math.round(100 / sum));
      }
    }
    //show results after calculation run
    setShowOralResult(true);
  };*/

  return (
    <form>
      <OralInput
        oralInputFields={oralInputFields}
        handleOralFormChange={handleOralFormChange}
        handleOralUnknownChange={handleOralUnknownChange}
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
