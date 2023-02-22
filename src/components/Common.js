import React, { useState } from 'react';
import OralInput from './oral/OralInput';
import DermalInput from './dermal/DermalInput';
import GasesInput from './gases/GasesInput';
import VaporsInput from './vapors/VaporsInput';
import DustsInput from './dusts/DustsInput';
import { OralPointEstimate } from './oral/OralLookup';
import { DermalPointEstimate } from './dermal/DermalLookup';
import { GasesPointEstimate } from './gases/GasesLookup';
import { VaporsPointEstimate } from './vapors/VaporsLookup';
import { DustsPointEstimate } from './dusts/DustsLookup';
import { Buttons } from './Buttons';
import { Alert } from './Alert';

const Common = ({ category, obj, setResult, setShowResult }) => {
  //setOralResult, setShowOralResult
  //console.log(category); //TODO: ERROR ON INPUT ONCHANGE Warning: A component is changing an uncontrolled input to be controlled.

  const [inputFields, setInputFields] = useState([
    /*{
      [`ingredient_` + category]: '',
      [`weight_` + category]: '',
      [`LDLC50_` + category]: '',
      [`limitdose_` + category]: '',
      [`classification_` + category]: '',
    },*/
    obj,
  ]);

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleFormChange = (e, idx) => {
    let data = [...inputFields];
    //limit WT and LD50 input to 2 decimal places
    if (
      e.target.name === 'weight_' + category ||
      e.target.name === 'LDLC50_' + category
    ) {
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
      if (!item[[`ingredient_` + category]]) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Ingredient is required in row.');
      } else if (!item[[`weight_` + category]]) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText('Weight (WT) is required in row.');
      } else if (
        !item[[`LDLC50_` + category]] &&
        !item[[`limitdose_` + category]] &&
        !item[[`classification_` + category]]
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'LD50/LC50 or Limit Dose Data or Classification is required in row.' //TODO: how to handle LD50 vs LC50 here?
        );
      } else if (
        !(
          item[[`LDLC50_` + category]] &&
          !item[[`limitdose_` + category]] &&
          !item[[`classification_` + category]]
        ) &&
        !(
          !item[[`LDLC50_` + category]] &&
          item[[`limitdose_` + category]] &&
          !item[[`classification_` + category]]
        ) &&
        !(
          !item[[`LDLC50_` + category]] &&
          !item[[`limitdose_` + category]] &&
          item[[`classification_` + category]]
        )
      ) {
        validArray.push(false);
        setOpenAlert(true);
        setAlertText(
          'Enter only one of LD50/LC50, Limit Dose Data, or Classification in row.' //TODO: how to handle LD50 vs LC50 here?
        );
      } else {
        validArray.push(true);
      }
    });

    //highlight invalid rows
    validArray.forEach((item, index) => {
      if (item === false) {
        document
          .querySelector(`table#${category} tbody tr.row` + index)
          .classList.add('usa-alert--error');
      } else {
        document
          .querySelector(`table#${category} tbody tr.row` + index)
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
    let newfield =
      /*{
      [`ingredient_` + category]: '',
      [`weight_` + category]: '',
      [`LDLC50_` + category]: '',
      [`limitdose_` + category]: '',
      [`classification_` + category]: '',
    };*/
      obj;
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
      /*{
        [`ingredient_` + category]: '',
        [`weight_` + category]: '',
        [`LDLC50_` + category]: '',
        [`limitdose_` + category]: '',
        [`classification_` + category]: '',
      },*/
      obj,
    ]);
    setUnknown('');
    //setShowOralResult(false);
    setShowResult(false);
  };

  const calculate = (e) => {
    let data = [...inputFields];

    let limitdose = null;
    let classification = '';

    let results = data
      .filter(
        (obj) =>
          (obj[`LDLC50_` + category] !== '' &&
            parseFloat(obj[`LDLC50_` + category]) <= 5000) ||
          (obj[`limitdose_` + category] !== '' &&
            obj[`limitdose_` + category] !==
              '> 2,000 (No signs of toxicity)') || //TODO: need to handle for different values here
          (obj[`classification_` + category] !== '' &&
            obj[`classification_` + category] !==
              'Not Classified (LD50 > 5,000)') //TODO: need to handle for different values here
      )
      .map((obj) => {
        if (obj[`LDLC50_` + category] !== '') {
          return {
            ...obj,
            [`LDLC50_` + category]:
              parseFloat(obj[`weight_` + category]) /
              parseFloat(obj[`LDLC50_` + category]),
          };
        }
        if (obj[`limitdose_` + category] !== '') {
          //TODO: how to make generic?

          if (category === 'Oral') {
            limitdose = OralPointEstimate(
              'Limit Dose',
              obj[`limitdose_` + category]
            );
          }
          if (category === 'Dermal') {
            limitdose = DermalPointEstimate(
              'Limit Dose',
              obj[`limitdose_` + category]
            );
          }
          if (category === 'Gases') {
            limitdose = GasesPointEstimate(
              'Limit Dose',
              obj[`limitdose_` + category]
            );
          }
          if (category === 'Vapors') {
            limitdose = VaporsPointEstimate(
              'Limit Dose',
              obj[`limitdose_` + category]
            );
          }
          if (category === 'Dusts') {
            limitdose = DustsPointEstimate(
              'Limit Dose',
              obj[`limitdose_` + category]
            );
          }

          return {
            ...obj,
            [`limitdose_` + category]:
              parseFloat(obj[`weight_` + category]) / limitdose,
            //oralPointEstimate('Limit Dose', obj[`limitdose_` + category]), //TODO: how to make generic?
          };
        }
        if (obj[`classification_` + category] !== '') {
          if (category === 'Oral') {
            classification = OralPointEstimate(
              'Classification',
              obj[`classification_` + category]
            );
          }

          if (category === 'Dermal') {
            classification = DermalPointEstimate(
              'Classification',
              obj[`classification_` + category]
            );
          }
          if (category === 'Gases') {
            classification = GasesPointEstimate(
              'Classification',
              obj[`classification_` + category]
            );
          }
          if (category === 'Vapors') {
            classification = VaporsPointEstimate(
              'Classification',
              obj[`classification_` + category]
            );
          }
          if (category === 'Dusts') {
            classification = DustsPointEstimate(
              'Classification',
              obj[`classification_` + category]
            );
          }

          return {
            ...obj,
            [`classification_` + category]:
              parseFloat(obj[`weight_` + category]) / classification,
            /*oralPointEstimate(
                'Classification',
                obj[`classification_` + category]
              ),*/ //TODO: how to make generic?
          };
        }
        return obj;
      });

    const totalWTPercent = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object[`weight_` + category]);
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
          if (item[`LDLC50_` + category] !== '') {
            sum += item[`LDLC50_` + category];
          }
          if (item[`limitdose_` + category] !== '') {
            sum += item[`limitdose_` + category];
          }
          if (item[`classification_` + category] !== '') {
            sum += item[`classification_` + category];
          }
        });
        //calculate result (round 1 decimal place)
        if (unknown !== null && unknown > 10) {
          setResult(Math.round((100 - unknown) / sum)); //TODO: need to handle for different values here?
        } else {
          setResult(Math.round(100 / sum)); //TODO: need to handle for different values here?
        }
      } else {
        setResult(null);
      }
      setShowResult(true);
    } else {
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      setShowResult(false);
    }
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}

      {/*<OralInput //TODO: how to make generic?
          inputFields={inputFields}
          unknown={unknown}
          handleFormChange={handleFormChange}
          handleUnknownChange={handleUnknownChange}
          removeRow={removeRow}
      />*/}
      {category === 'Oral' ? (
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
      ) : null}
      {category === 'Dermal' ? (
        <form>
          <DermalInput
            inputFields={inputFields}
            unknown={unknown}
            handleFormChange={handleFormChange}
            handleUnknownChange={handleUnknownChange}
            removeRow={removeRow}
          />
          <Buttons validateRows={validateRows} reset={reset} />
        </form>
      ) : null}
      {category === 'Gases' ? (
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
      ) : null}
      {category === 'Vapors' ? (
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
      ) : null}
      {category === 'Dusts' ? (
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
      ) : null}
    </>
  );
};

export default Common;
