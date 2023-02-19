import React, { useState } from 'react';
import OralInput from './OralInput';
import { oralPointEstimate } from './OralLookup';
import Buttons from '../Buttons';
import { Alert } from '../Alert';
//Then in your components that you want to use the util functions, import the specific functions that are needed. 
//You don't have to import everything
//import {doSomethingWithInput, justAnAlert} from './path/to/Utils.js'

//import HandleUnknownChange from '../Utils';

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

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT and LD50 input to 2 decimal places
    if (e.target.name === 'weight_oral' || e.target.name === 'LD50_oral') {
      let t = e.target.value;
      data[idx][e.target.name] =
        t.indexOf('.') >= 0
          ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 3)
          : t;
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
    let validArray = [];
    data.forEach((item) => {
      if (!item.ingredient_oral) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Ingredient is required in row.');
      } else if (!item.weight_oral) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Weight (WT) is required in row.');
      } else if (
        !item.LD50_oral &&
        !item.limitdose_oral &&
        !item.classification_oral
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'LD50 or Limit Dose Data or Classification is required in row.'
        );
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
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'Enter only one of LD50, Limit Dose Data, or Classification in row.'
        );
      } else {
        validArray.push(true);
      }
    });

    //highlight invalid rows
    validArray.forEach((item, index) => {
      if (item === false) {
        document
          .querySelector('table#oral tbody tr.row' + index)
          .classList.add('usa-alert--error');
      } else {
        document
          .querySelector('table#oral tbody tr.row' + index)
          .classList.remove('usa-alert--error');
      }
    });

    //if valid data proceed to add rows or calculate
    if (!validArray.includes(false) && e.target.id === 'add') {
      addRow();
    }
    if (!validArray.includes(false) && e.target.id === 'calculate') {
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
        ingredient_oral: '',
        weight_oral: '',
        LD50_oral: '',
        limitdose_oral: '',
        classification_oral: '',
      },
    ]);
    setUnknown('');
    setShowOralResult(false);
  };

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
        //calculate result (round 1 decimal place)
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
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      setShowOralResult(false);
    }
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <OralInput
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

export default Oral;
