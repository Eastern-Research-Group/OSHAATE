import React, { useState } from 'react';
import DustsInput from './DustsInput';
import { dustsPointEstimate } from './DustsLookup';
import Buttons from '../Buttons';
import { Alert } from '../Alert';

const Dusts = ({ setDustsResult, setShowDustsResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_dusts: '',
      weight_dusts: '',
      LC50_dusts: '',
      limitdose_dusts: '',
      classification_dusts: '',
    },
  ]);

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT and LC50 input to 2 decimal places
    if (e.target.name === 'weight_dusts' || e.target.name === 'LC50_dusts') {
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
      if (!item.ingredient_dusts) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Ingredient is required in row.');
      } else if (!item.weight_dusts) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Weight (WT) is required in row.');
      } else if (
        !item.LC50_dusts &&
        !item.limitdose_dusts &&
        !item.classification_dusts
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'LC50 or Limit Dose Data or Classification is required in row.'
        );
      } else if (
        !(
          item.LC50_dusts &&
          !item.limitdose_dusts &&
          !item.classification_dusts
        ) &&
        !(
          !item.LC50_dusts &&
          item.limitdose_dusts &&
          !item.classification_dusts
        ) &&
        !(
          !item.LC50_dusts &&
          !item.limitdose_dusts &&
          item.classification_dusts
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

    //highlight invalid rows
    validArray.forEach((item, index) => {
      if (item === false) {
        document
          .querySelector('table#dusts tbody tr.row' + index)
          .classList.add('usa-alert--error');
      } else {
        document
          .querySelector('table#dusts tbody tr.row' + index)
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
      ingredient_dusts: '',
      weight_dusts: '',
      LC50_dusts: '',
      limitdose_dusts: '',
      classification_dusts: '',
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
        ingredient_dusts: '',
        weight_dusts: '',
        LC50_dusts: '',
        limitdose_dusts: '',
        classification_dusts: '',
      },
    ]);
    setUnknown('');
    setShowDustsResult(false);
  };

  const calculate = (e) => {
    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj.LC50_dusts !== '' && parseFloat(obj.LC50_dusts) <= 5) ||
          (obj.limitdose_dusts !== '' &&
            obj.limitdose_dusts !== '> 5.0 (No signs of toxicity)') ||
          (obj.classification_dusts !== '' &&
            obj.classification_dusts !== 'Not Classified (LC50 > 5.0)')
      )
      .map((obj) => {
        if (obj.LC50_dusts !== '') {
          return {
            ...obj,
            LC50_dusts:
              parseFloat(obj.weight_dusts) / parseFloat(obj.LC50_dusts),
          };
        }
        if (obj.limitdose_dusts !== '') {
          return {
            ...obj,
            limitdose_dusts:
              parseFloat(obj.weight_dusts) /
              dustsPointEstimate('Limit Dose', obj.limitdose_dusts),
          };
        }
        if (obj.classification_dusts !== '') {
          return {
            ...obj,
            classification_dusts:
              parseFloat(obj.weight_dusts) /
              dustsPointEstimate('Classification', obj.classification_dusts),
          };
        }
        return obj;
      });

    const totalWTPercentDusts = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_dusts);
    }, 0);
    //validate weight total to be calculated (not greater than 100)
    if (
      !(
        (!unknown && totalWTPercentDusts > 100) ||
        (unknown !== null && totalWTPercentDusts + parseFloat(unknown) > 100)
      )
    ) {
      //if results, sum
      let sum = 0;
      if (results.length) {
        results.forEach((item) => {
          if (item.LC50_dusts !== '') {
            sum += item.LC50_dusts;
          }
          if (item.limitdose_dusts !== '') {
            sum += item.limitdose_dusts;
          }
          if (item.classification_dusts !== '') {
            sum += item.classification_dusts;
          }
        });
        //calculate result (round 1 decimal place)
        if (unknown !== null && unknown > 10) {
          setDustsResult(Math.round(((100 - unknown) / sum) * 100) / 100);
        } else {
          setDustsResult(Math.round((100 / sum) * 100) / 100);
        }
      } else {
        setDustsResult(null);
      }
      setShowDustsResult(true);
    } else {
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      setShowDustsResult(false);
    }
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <DustsInput
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

export default Dusts;
