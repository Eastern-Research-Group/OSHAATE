import { OralPointEstimate } from './oral/OralLookup';
import { DermalPointEstimate } from './dermal/DermalLookup';
import { GasesPointEstimate } from './gases/GasesLookup';
import { VaporsPointEstimate } from './vapors/VaporsLookup';
import { DustsPointEstimate } from './dusts/DustsLookup';

/*ingredient_oral: '',
      weight_oral: '',
      LDLC50_oral: '',
      limitdose_oral: '',
      classification_oral: '',*/

//Function to handle input changes
export const HandleFormChange = (
  e,
  idx,
  inputFields,
  setInputFields,
  category
) => {
  let data = [...inputFields];

  //limit WT and LD50 or LC50 input to 2 decimal places
  if (
    e.target.name === `weight_${category.toLowerCase()}` ||
    e.target.name === `LDLC50_${category.toLowerCase()}`
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

//Function to handle unknown input change
export const HandleUnknownChange = (e, setUnknown) => {
  setUnknown(e.target.value);
};

//Function to validate rows on Add ingredient or Calculate
export const ValidateRows = (
  e,
  inputFields,
  setInputFields,
  setOpenAlert,
  setAlertText,
  category,
  unknown,
  setOralResult,
  setShowOralResult,
  setDermalResult,
  setShowDermalResult,
  setGasesResult,
  setShowGasesResult,
  setVaporsResult,
  setShowVaporsResult,
  setDustsResult,
  setShowDustsResult
) => {
  e.preventDefault();
  let cat = category.toLowerCase();
  let data = [...inputFields];
  let validArray = [];
  data.forEach((item) => {
    if (!item[[`ingredient_` + cat]]) {
      validArray.push(false);
      setOpenAlert(true);
      setAlertText('Ingredient is required in row.');
    } else if (!item[[`weight_` + cat]]) {
      validArray.push(false);
      setOpenAlert(true);
      setAlertText('Weight (WT) is required in row.');
    } else if (
      !item[[`LDLC50_` + cat]] &&
      !item[[`limitdose_` + cat]] &&
      !item[[`classification_` + cat]]
    ) {
      validArray.push(false);
      setOpenAlert(true);
      if (cat === 'oral' || cat === 'dermal') {
        setAlertText(
          'LD50 or Limit Dose Data or Classification is required in row.'
        );
      }
      if (cat === 'gases' || cat === 'vapors' || cat === 'dusts') {
        setAlertText(
          'LC50 or Limit Dose Data or Classification is required in row.'
        );
      }
    } else if (
      !(
        item[[`LDLC50_` + cat]] &&
        !item[[`limitdose_` + cat]] &&
        !item[[`classification_` + cat]]
      ) &&
      !(
        !item[[`LDLC50_` + cat]] &&
        item[[`limitdose_` + cat]] &&
        !item[[`classification_` + cat]]
      ) &&
      !(
        !item[[`LDLC50_` + cat]] &&
        !item[[`limitdose_` + cat]] &&
        item[[`classification_` + cat]]
      )
    ) {
      validArray.push(false);
      setOpenAlert(true);
      if (cat === 'oral' || cat === 'dermal') {
        setAlertText(
          'Enter only one of LD50, Limit Dose Data, or Classification in row.'
        );
      }
      if (cat === 'gases' || cat === 'vapors' || cat === 'dusts') {
        setAlertText(
          'Enter only one of LC50, Limit Dose Data, or Classification in row.'
        );
      }
    } else {
      validArray.push(true);
    }
  });

  //highlight invalid rows
  validArray.forEach((item, index) => {
    if (item === false) {
      document
        .querySelector(`table#${cat} tbody tr.row` + index)
        .classList.add('usa-alert--error');
    } else {
      document
        .querySelector(`table#${cat} tbody tr.row` + index)
        .classList.remove('usa-alert--error');
    }
  });

  //if valid data proceed to add rows or calculate
  if (!validArray.includes(false) && e.target.id === 'add') {
    //Add new ingredient row
    let newfield = {
      [`ingredient_` + cat]: '',
      [`weight_` + cat]: '',
      [`LDLC50_` + cat]: '',
      [`limitdose_` + cat]: '',
      [`classification_` + cat]: '',
    };
    setInputFields([...inputFields, newfield]);
  }
  if (!validArray.includes(false) && e.target.id === 'calculate') {
    //calculate();
    console.log(cat); //TODO: fix, on Dermal "Add ingredient" (validate), after Oral entry, cat is still resulting in oral
    let LDLC50max = 0,
      limitdosemax = '',
      classificationmax = '';
    if (cat === 'oral' || cat === 'dermal') {
      LDLC50max = 5000;
      limitdosemax = '> 2,000 (No signs of toxicity)';
      classificationmax = 'Not Classified (LD50 > 5,000)';
    }
    if (cat === 'gases') {
      LDLC50max = 20000;
      limitdosemax = '> 20,000 (No signs of toxicity)';
      classificationmax = 'Not Classified (LC50 > 20,000)';
    }
    if (cat === 'vapors') {
      LDLC50max = 20;
      limitdosemax = '> 20.0 (No signs of toxicity)';
      classificationmax = 'Not Classified (LC50 > 20.0)';
    }
    if (cat === 'dusts') {
      LDLC50max = 5;
      limitdosemax = '> 5.0 (No signs of toxicity)';
      classificationmax = 'Not Classified (LC50 > 5.0)';
    }

    //console.log(LDLC50max);
    //console.log(limitdosemax);
    //console.log(classificationmax);

    let data = [...inputFields];
    let results = data
      .filter(
        (obj) =>
          (obj[[`LDLC50_` + cat]] !== '' &&
            parseFloat(obj[[`LDLC50_` + cat]]) <= LDLC50max) ||
          (obj[[`limitdose_` + cat]] !== '' &&
            obj[[`limitdose_` + cat]] !== limitdosemax) ||
          (obj[[`classification_` + cat]] !== '' &&
            obj[[`classification_` + cat]] !== classificationmax)
      )
      .map((obj) => {
        if (obj[[`LDLC50_` + cat]] !== '') {
          return {
            ...obj,
            [`LDLC50_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              parseFloat(obj[[`LDLC50_` + cat]]),
          };
        }
        if (obj[[`limitdose_` + cat]] !== '') {
          if (cat === 'oral') {
            return {
              ...obj,
              [`limitdose_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                OralPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
            };
          }
          if (cat === 'dermal') {
            return {
              ...obj,
              [`limitdose_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                DermalPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
            };
          }
          if (cat === 'gases') {
            return {
              ...obj,
              [`limitdose_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                GasesPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
            };
          }
          if (cat === 'vapors') {
            return {
              ...obj,
              [`limitdose_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                VaporsPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
            };
          }
          if (cat === 'dusts') {
            return {
              ...obj,
              [`limitdose_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                DustsPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
            };
          }
        }
        if (obj[[`classification_` + cat]] !== '') {
          if (cat === 'oral') {
            return {
              ...obj,
              [`classification_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                OralPointEstimate(
                  'Classification',
                  obj[[`classification_` + cat]]
                ),
            };
          }
          if (cat === 'dermal') {
            return {
              ...obj,
              [`classification_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                DermalPointEstimate(
                  'Classification',
                  obj[[`classification_` + cat]]
                ),
            };
          }
          if (cat === 'gases') {
            return {
              ...obj,
              [`classification_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                GasesPointEstimate(
                  'Classification',
                  obj[[`classification_` + cat]]
                ),
            };
          }
          if (cat === 'vapors') {
            return {
              ...obj,
              [`classification_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                VaporsPointEstimate(
                  'Classification',
                  obj[[`classification_` + cat]]
                ),
            };
          }
          if (cat === 'dusts') {
            return {
              ...obj,
              [`classification_` + cat]:
                parseFloat(obj[[`weight_` + cat]]) /
                DustsPointEstimate(
                  'Classification',
                  obj[[`classification_` + cat]]
                ),
            };
          }
        }

        return obj;
      });

    const totalWTPercentOral = results.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.weight_oral);
    }, 0);
    //validate weight total to be calculated (not greater than 100) - TODO: can this be shared by all 5?
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
          if (item[[`LDLC50_` + cat]] !== '') {
            sum += item[[`LDLC50_` + cat]];
          }
          if (item[[`limitdose_` + cat]] !== '') {
            sum += item[[`limitdose_` + cat]];
          }
          if (item[[`classification_` + cat]] !== '') {
            sum += item[[`classification_` + cat]];
          }
        });

        //calculate result (round 1 decimal place)
        if (unknown !== null && unknown > 10) {
          if (cat === 'oral') {
            setOralResult(Math.round((100 - unknown) / sum));
          }
          if (cat === 'dermal') {
            setDermalResult(Math.round((100 - unknown) / sum));
          }
          if (cat === 'dusts') {
            setDustsResult(Math.round(((100 - unknown) / sum) * 100) / 100);
          }
          if (cat === 'gases') {
            setGasesResult(Math.round((100 - unknown) / sum));
          }
          if (cat === 'vapors') {
            setVaporsResult(Math.round(((100 - unknown) / sum) * 10) / 10);
          }
        } else {
          if (cat === 'oral') {
            setOralResult(Math.round(100 / sum)); //TODO: fix ERROR: setOralResult is not a function ?
          }
          if (cat === 'dermal') {
            setDermalResult(Math.round(100 / sum));
          }
          if (cat === 'dusts') {
            setDustsResult(Math.round((100 / sum) * 100) / 100);
          }
          if (cat === 'gases') {
            setGasesResult(Math.round(100 / sum));
          }
          if (cat === 'vapors') {
            setVaporsResult(Math.round((100 / sum) * 10) / 10);
          }
        }
      } else {
        if (cat === 'oral') {
          setOralResult(null);
        }
        if (cat === 'dermal') {
          setDermalResult(null);
        }
        if (cat === 'gases') {
          setGasesResult(null);
        }
        if (cat === 'vapors') {
          setVaporsResult(null);
        }
        if (cat === 'dusts') {
          setDustsResult(null);
        }
      }
      if (cat === 'oral') {
        setShowOralResult(true);
      }
      if (cat === 'dermal') {
        setShowDermalResult(true);
      }
      if (cat === 'gases') {
        setShowGasesResult(true);
      }
      if (cat === 'vapors') {
        setShowVaporsResult(true);
      }
      if (cat === 'dusts') {
        setShowDustsResult(true);
      }
    } else {
      setOpenAlert(true);
      setAlertText(
        'Total weight to be calculated must not be greater than 100%.'
      );
      if (cat === 'oral') {
        setShowOralResult(false);
      }
      if (cat === 'dermal') {
        setShowDermalResult(false);
      }
      if (cat === 'gases') {
        setShowGasesResult(false);
      }
      if (cat === 'vapors') {
        setShowVaporsResult(false);
      }
      if (cat === 'dusts') {
        setShowDustsResult(false);
      }
    }
  }
};

//Function to Calculate input
/*const calculate = (
  cat,
  inputFields,
  unknown,
  setOpenAlert,
  setAlertText,
  setOralResult,
  setShowOralResult,
  setDermalResult,
  setShowDermalResult,
  setGasesResult,
  setShowGasesResult,
  setVaporsResult,
  setShowVaporsResult,
  setDustsResult,
  setShowDustsResult
) => {
  //console.log(typeof setOralResult); //TODO: error: is undefined - is not a function
  let data = [...inputFields];
  let LDLC50max = 0,
    limitdosemax = '',
    classificationmax = '';
  if (cat === 'oral' || cat === 'dermal') {
    LDLC50max = 5000;
    limitdosemax = '> 2,000 (No signs of toxicity)';
    classificationmax = 'Not Classified (LD50 > 5,000)';
  }
  if (cat === 'gases') {
    LDLC50max = 20000;
    limitdosemax = '> 20,000 (No signs of toxicity)';
    classificationmax = 'Not Classified (LC50 > 20,000)';
  }
  if (cat === 'vapors') {
    LDLC50max = 20;
    limitdosemax = '> 20.0 (No signs of toxicity)';
    classificationmax = 'Not Classified (LC50 > 20.0)';
  }
  if (cat === 'dusts') {
    LDLC50max = 5;
    limitdosemax = '> 5.0 (No signs of toxicity)';
    classificationmax = 'Not Classified (LC50 > 5.0)';
  }

  let results = data
    .filter(
      (obj) =>
        (obj[[`LDLC50_` + cat]] !== '' &&
          parseFloat(obj[[`LDLC50_` + cat]]) <= LDLC50max) ||
        (obj[[`limitdose_` + cat]] !== '' &&
          obj[[`limitdose_` + cat]] !== limitdosemax) ||
        (obj[[`classification_` + cat]] !== '' &&
          obj[[`classification_` + cat]] !== classificationmax)
    )
    .map((obj) => {
      if (obj[[`LDLC50_` + cat]] !== '') {
        return {
          ...obj,
          [`LDLC50_` + cat]:
            parseFloat(obj[[`weight_` + cat]]) /
            parseFloat(obj[[`LDLC50_` + cat]]),
        };
      }
      if (obj[[`limitdose_` + cat]] !== '') {
        if (cat === 'oral') {
          return {
            ...obj,
            [`limitdose_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              OralPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
          };
        }
        if (cat === 'dermal') {
          return {
            ...obj,
            [`limitdose_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              DermalPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
          };
        }
        if (cat === 'gases') {
          return {
            ...obj,
            [`limitdose_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              GasesPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
          };
        }
        if (cat === 'vapors') {
          return {
            ...obj,
            [`limitdose_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              VaporsPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
          };
        }
        if (cat === 'dusts') {
          return {
            ...obj,
            [`limitdose_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              DustsPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
          };
        }
      }
      if (obj[[`classification_` + cat]] !== '') {
        if (cat === 'oral') {
          return {
            ...obj,
            [`classification_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              OralPointEstimate(
                'Classification',
                obj[[`classification_` + cat]]
              ),
          };
        }
        if (cat === 'dermal') {
          return {
            ...obj,
            [`classification_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              DermalPointEstimate(
                'Classification',
                obj[[`classification_` + cat]]
              ),
          };
        }
        if (cat === 'gases') {
          return {
            ...obj,
            [`classification_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              GasesPointEstimate(
                'Classification',
                obj[[`classification_` + cat]]
              ),
          };
        }
        if (cat === 'vapors') {
          return {
            ...obj,
            [`classification_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              VaporsPointEstimate(
                'Classification',
                obj[[`classification_` + cat]]
              ),
          };
        }
        if (cat === 'dusts') {
          return {
            ...obj,
            [`classification_` + cat]:
              parseFloat(obj[[`weight_` + cat]]) /
              DustsPointEstimate(
                'Classification',
                obj[[`classification_` + cat]]
              ),
          };
        }
      }

      return obj;
    });

  const totalWTPercentOral = results.reduce((accumulator, object) => {
    return accumulator + parseFloat(object.weight_oral);
  }, 0);
  //validate weight total to be calculated (not greater than 100) - TODO: can this be shared by all 5?
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
        if (item[[`LDLC50_` + cat]] !== '') {
          sum += item[[`LDLC50_` + cat]];
        }
        if (item[[`limitdose_` + cat]] !== '') {
          sum += item[[`limitdose_` + cat]];
        }
        if (item[[`classification_` + cat]] !== '') {
          sum += item[[`classification_` + cat]];
        }
      });

      //calculate result (round 1 decimal place)
      if (unknown !== null && unknown > 10) {
        if (cat === 'oral') {
          setOralResult(Math.round((100 - unknown) / sum));
        }
        if (cat === 'dermal') {
          setDermalResult(Math.round((100 - unknown) / sum));
        }
        if (cat === 'dusts') {
          setDustsResult(Math.round(((100 - unknown) / sum) * 100) / 100);
        }
        if (cat === 'gases') {
          setGasesResult(Math.round((100 - unknown) / sum));
        }
        if (cat === 'vapors') {
          setVaporsResult(Math.round(((100 - unknown) / sum) * 10) / 10);
        }
      } else {
        if (cat === 'oral') {
          setOralResult(Math.round(100 / sum));
        }
        if (cat === 'dermal') {
          setDermalResult(Math.round(100 / sum));
        }
        if (cat === 'dusts') {
          setDustsResult(Math.round((100 / sum) * 100) / 100);
        }
        if (cat === 'gases') {
          setGasesResult(Math.round(100 / sum));
        }
        if (cat === 'vapors') {
          setVaporsResult(Math.round((100 / sum) * 10) / 10);
        }
      }
    } else {
      if (cat === 'oral') {
        setOralResult(null);
      }
      if (cat === 'dermal') {
        setDermalResult(null);
      }
      if (cat === 'gases') {
        setGasesResult(null);
      }
      if (cat === 'vapors') {
        setVaporsResult(null);
      }
      if (cat === 'dusts') {
        setDustsResult(null);
      }
    }
    if (cat === 'oral') {
      setShowOralResult(true);
    }
    if (cat === 'dermal') {
      setShowDermalResult(true);
    }
    if (cat === 'gases') {
      setShowGasesResult(true);
    }
    if (cat === 'vapors') {
      setShowVaporsResult(true);
    }
    if (cat === 'dusts') {
      setShowDustsResult(true);
    }
  } else {
    setOpenAlert(true);
    setAlertText(
      'Total weight to be calculated must not be greater than 100%.'
    );
    if (cat === 'oral') {
      setShowOralResult(false);
    }
    if (cat === 'dermal') {
      setShowDermalResult(false);
    }
    if (cat === 'gases') {
      setShowGasesResult(false);
    }
    if (cat === 'vapors') {
      setShowVaporsResult(false);
    }
    if (cat === 'dusts') {
      setShowDustsResult(false);
    }
  }
};*/

export const RemoveRow = (e, idx, inputFields, setInputFields) => {
  e.preventDefault();
  let data = [...inputFields];
  data.splice(idx, 1);
  setInputFields(data);
};

export const Reset = (
  e,
  inputFields,
  setInputFields,
  setUnknown,
  setShowOralResult,
  setShowDermalResult,
  setShowGasesResult,
  setShowVaporsResult,
  setShowDustsResult,
  category
) => {
  e.preventDefault();
  let cat = category.lowerCase();
  let data = [...inputFields];
  data.splice(1);
  setInputFields([
    {
      [`ingredient_` + cat]: '',
      [`weight_` + cat]: '',
      [`LDLC50_` + cat]: '',
      [`limitdose_` + cat]: '',
      [`classification_` + cat]: '',
    },
  ]);
  setUnknown('');
  if (cat === 'oral') {
    setShowOralResult(false);
  }
  if (cat === 'dermal') {
    setShowDermalResult(false);
  }
  if (cat === 'gases') {
    setShowGasesResult(false);
  }
  if (cat === 'vapors') {
    setShowVaporsResult(false);
  }
  if (cat === 'dusts') {
    setShowDustsResult(false);
  }
};
