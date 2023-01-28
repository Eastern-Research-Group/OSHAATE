import React, { useState } from 'react';
import GasesInput from './GasesInput';
import { gasesPointEstimate } from './GasesLookup';
import Buttons from '../Buttons';
import { Alert } from '../Alert';

const Gases = ({ setGasesResult, setShowGasesResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_gases: '',
      weight_gases: '',
      LC50_gases: '',
      limitdose_gases: '',
      classification_gases: '',
    },
  ]);

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT and LC50 input to 2 decimal places
    if (e.target.name === 'weight_gases' || e.target.name === 'LC50_gases') {
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
      if (!item.ingredient_gases) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Ingredient is required in row.');
      } else if (!item.weight_gases) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Weight (WT) is required in row.');
      } else if (
        !item.LC50_gases &&
        !item.limitdose_gases &&
        !item.classification_gases
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'LC50 or Limit Dose Data or Classification is required in row.'
        );
      } else if (
        !(
          item.LC50_gases &&
          !item.limitdose_gases &&
          !item.classification_gases
        ) &&
        !(
          !item.LC50_gases &&
          item.limitdose_gases &&
          !item.classification_gases
        ) &&
        !(
          !item.LC50_gases &&
          !item.limitdose_gases &&
          item.classification_gases
        )
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'Enter only one of LC50, Limit Dose Data, or Classification in row.'
        );
      } else {
        validArray.push(true);
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
      ingredient_gases: '',
      weight_gases: '',
      LC50_gases: '',
      limitdose_gases: '',
      classification_gases: '',
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
        ingredient_gases: '',
        weight_gases: '',
        LC50_gases: '',
        limitdose_gases: '',
        classification_gases: '',
      },
    ]);
    setUnknown('');
    setShowGasesResult(false);
  };

  const calculate = (e) => {
    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LC50_gases !== '' && parseFloat(obj.LC50_gases) <= 20000) ||
          (obj.limitdose_gases !== '' &&
            obj.limitdose_gases !== '> 20,000 (No signs of toxicity)') ||
          (obj.classification_gases !== '' &&
            obj.classification_gases !== 'Not Classified (LC50 > 20,000)')
      )
      .map((obj) => {
        if (obj.LC50_gases !== '') {
          return {
            ...obj,
            LC50_gases:
              parseFloat(obj.weight_gases) / parseFloat(obj.LC50_gases),
          };
        }
        if (obj.limitdose_gases !== '') {
          return {
            ...obj,
            limitdose_gases:
              parseFloat(obj.weight_gases) /
              gasesPointEstimate('Limit Dose', obj.limitdose_gases),
          };
        }
        if (obj.classification_gases !== '') {
          return {
            ...obj,
            classification_gases:
              parseFloat(obj.weight_gases) /
              gasesPointEstimate('Classification', obj.classification_gases),
          };
        }
        return obj;
      });

    const totalWTPercentGases = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_gases);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercentGases > 100) ||
        (unknown !== null && totalWTPercentGases + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
        results.forEach((item) => {
          if (item.LC50_gases !== '') {
            sum += item.LC50_gases;
          }
          if (item.limitdose_gases !== '') {
            sum += item.limitdose_gases;
          }
          if (item.classification_gases !== '') {
            sum += item.classification_gases;
          }
        });
        //calculate result (round 1 decimal place)
        if (unknown !== null && unknown > 10) {
          setGasesResult(Math.round((100 - unknown) / sum));
        } else {
          setGasesResult(Math.round(100 / sum));
        }
      } else {
        setGasesResult(null);
      }
      setShowGasesResult(true);
    } else {
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      setShowGasesResult(false);
    }
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <GasesInput
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

export default Gases;
