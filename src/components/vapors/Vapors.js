import React, { useState } from 'react';
import VaporsInput from './VaporsInput';
import { vaporsPointEstimate } from './VaporsLookup';
import Buttons from '../Buttons';
import { Alert } from '../Alert';

const Vapors = ({ setVaporsResult, setShowVaporsResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_vapors: '',
      weight_vapors: '',
      LC50_vapors: '',
      limitdose_vapors: '',
      classification_vapors: '',
    },
  ]);

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT input to 2 decimal places
    if (e.target.name === 'weight_vapors' || e.target.name === 'LC50_vapors') {
      data[idx][e.target.name] = e.target.value.replace(
        /(?<=\.[0-9]{2}).+/g,
        ''
      );
    } else {
      data[idx][e.target.name] = e.target.value;
    }
    setInputFields(data);
  };

  const handleUnknownChange = (e) => {
    setUnknown(e.target.value);
  };

  const validateRows = (e) => {
    e.preventDefault();
    let data = [...inputFields];
    let formIsValid = true;
    data.forEach((item) => {
      if (!item.ingredient_vapors) {
        formIsValid = false;
        setOpenAlert(true);
        setAlertText('Ingredient is required in row.');
      } else if (!item.weight_vapors) {
        formIsValid = false;
        setOpenAlert(true);
        setAlertText('Weight (WT) is required in row.');
      } else if (
        !item.LC50_vapors &&
        !item.limitdose_vapors &&
        !item.classification_vapors
      ) {
        formIsValid = false;
        setOpenAlert(true);
        setAlertText(
          'LC50 or Limit Dose Data or Classification is required in row.'
        );
      } else if (
        !(
          item.LC50_vapors &&
          !item.limitdose_vapors &&
          !item.classification_vapors
        ) &&
        !(
          !item.LC50_vapors &&
          item.limitdose_vapors &&
          !item.classification_vapors
        ) &&
        !(
          !item.LC50_vapors &&
          !item.limitdose_vapors &&
          item.classification_vapors
        )
      ) {
        formIsValid = false;
        setOpenAlert(true);
        setAlertText(
          'Enter only one of LC50, Limit Dose Data, or Classification in row.'
        );
      } else {
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
      ingredient_vapors: '',
      weight_vapors: '',
      LC50_vapors: '',
      limitdose_vapors: '',
      classification_vapors: '',
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
        ingredient_vapors: '',
        weight_vapors: '',
        LC50_vapors: '',
        limitdose_vapors: '',
        classification_vapors: '',
      },
    ]);
    setUnknown('');
    setShowVaporsResult(false);
  };

  const calculate = (e) => {
    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LC50_vapors !== '' && parseFloat(obj.LC50_vapors) <= 20) ||
          (obj.limitdose_vapors !== '' &&
            obj.limitdose_vapors !== '> 20.0 (No signs of toxicity)') ||
          (obj.classification_vapors !== '' &&
            obj.classification_vapors !== 'Not Classified (LC50 > 20.0)')
      )
      .map((obj) => {
        if (obj.LC50_vapors !== '') {
          return {
            ...obj,
            LC50_vapors:
              parseFloat(obj.weight_vapors) / parseFloat(obj.LC50_vapors),
          };
        }
        if (obj.limitdose_vapors !== '') {
          return {
            ...obj,
            limitdose_vapors:
              parseFloat(obj.weight_vapors) /
              vaporsPointEstimate('Limit Dose', obj.limitdose_vapors),
          };
        }
        if (obj.classification_vapors !== '') {
          return {
            ...obj,
            classification_vapors:
              parseFloat(obj.weight_vapors) /
              vaporsPointEstimate('Classification', obj.classification_vapors),
          };
        }
        return obj;
      });

    const totalWTPercentVapors = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_vapors);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercentVapors > 100) ||
        (unknown !== null && totalWTPercentVapors + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
        results.forEach((item) => {
          if (item.LC50_vapors !== '') {
            sum += item.LC50_vapors;
          }
          if (item.limitdose_vapors !== '') {
            sum += item.limitdose_vapors;
          }
          if (item.classification_vapors !== '') {
            sum += item.classification_vapors;
          }
        });
        //calculate result (round 1 decimal place)
        if (unknown !== null && unknown > 10) {
          setVaporsResult(Math.round(((100 - unknown) / sum) * 10) / 10);
        } else {
          setVaporsResult(Math.round((100 / sum) * 10) / 10);
        }
      } else {
        setVaporsResult(null);
      }
      setShowVaporsResult(true);
    } else {
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      setShowVaporsResult(false);
    }
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <VaporsInput
          inputFields={inputFields}
          unknown={unknown}
          handleFormChange={handleFormChange}
          handleUnknownChange={handleUnknownChange}
          removeRow={removeRow}
        />
        <Buttons validateRows={validateRows} reset={reset} />
      </form>
    </>
  );
};

export default Vapors;
