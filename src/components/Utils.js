import { OralPointEstimate } from './oral/OralLookup';
import { DermalPointEstimate } from './dermal/DermalLookup';
import { GasesPointEstimate } from './gases/GasesLookup';
import { VaporsPointEstimate } from './vapors/VaporsLookup';
import { DustsPointEstimate } from './dusts/DustsLookup';

//Function to handle input changes
export const HandleFormChange = (
  e,
  idx,
  inputFields,
  setInputFields,
  category
) => {
  let data = [...inputFields];

  //limit WT and LD/LC50 input to 2 decimal places
  if (
    e.target.name === `weight_${category.toLowerCase()}` ||
    e.target.name === `LD50_${category.toLowerCase()}`
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
  category
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
      !item[[`LD50_` + cat]] &&
      !item[[`limitdose_` + cat]] &&
      !item[[`classification_` + cat]]
    ) {
      validArray.push(false);
      setOpenAlert(true);
      setAlertText(
        'LD50 or Limit Dose Data or Classification is required in row.' //TODO: need to handle LD50 (oral, dermal) or LC50 (others)
      );
    } else if (
      !(
        item[[`LD50_` + cat]] &&
        !item[[`limitdose_` + cat]] &&
        !item[[`classification_` + cat]]
      ) &&
      !(
        !item[[`LD50_` + cat]] &&
        item[[`limitdose_` + cat]] &&
        !item[[`classification_` + cat]]
      ) &&
      !(
        !item[[`LD50_` + cat]] &&
        !item[[`limitdose_` + cat]] &&
        item[[`classification_` + cat]]
      )
    ) {
      validArray.push(false);
      setOpenAlert(true);
      setAlertText(
        'Enter only one of LD50, Limit Dose Data, or Classification in row.' //TODO: need to handle LD50 (oral, dermal) or LC50 (others)
      );
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
    calculate();
  }
};

//Function to Calculate input
const calculate = (
  category,
  inputFields,
  unknown,
  setOpenAlert,
  setAlertText,
  setOralResult,
  setShowOralResult
) => {
  let cat = category.toLowercase();
  let data = [...inputFields];
  let results = data
    .filter(
      (obj) =>
        (obj[[`LD50_` + cat]] !== '' &&
          parseFloat(obj[[`LD50_` + cat]]) <= 5000) ||
        (obj[[`limitdose_` + cat]] !== '' &&
          obj[[`limitdose_` + cat]] !== '> 2,000 (No signs of toxicity)') || //TODO: need to handle for all
        (obj[[`classification_` + cat]] !== '' &&
          obj[[`classification_` + cat]] !== 'Not Classified (LD50 > 5,000)') //TODO: need to handle for all
    )
    .map((obj) => {
      //TODO: need to handle for all
      if (obj[[`LD50_` + cat]] !== '') {
        return {
          ...obj,
          LD50_oral:
            parseFloat(obj[[`weight_` + cat]]) /
            parseFloat(obj[[`LD50_` + cat]]),
        };
      }
      if (obj[[`limitdose_` + cat]] !== '') {
        //TODO: need to handle for all
        return {
          ...obj,
          limitdose_oral:
            parseFloat(obj[[`weight_` + cat]]) /
            OralPointEstimate('Limit Dose', obj[[`limitdose_` + cat]]),
        };
      }
      if (obj.classification_oral !== '') {
        //TODO: need to handle for all
        return {
          ...obj,
          classification_oral:
            parseFloat(obj[[`weight_` + cat]]) /
            OralPointEstimate('Classification', obj[[`classification_` + cat]]),
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
        //TODO: need to handle for all
        if (item[[`LD50_` + cat]] !== '') {
          sum += item[[`LD50_` + cat]];
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
        setOralResult(Math.round((100 - unknown) / sum)); //TODO: need to handle for all
      } else {
        setOralResult(Math.round(100 / sum)); //TODO: need to handle for all
      }
    } else {
      setOralResult(null); //TODO: need to handle for all
    }
    setShowOralResult(true); //TODO: need to handle for all
  } else {
    setOpenAlert(true);
    setAlertText(
      'Total weight to be calculated must not be greater than 100%.'
    );
    setShowOralResult(false); //TODO: need to handle for all
  }
};

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
  setShowOralResult, //TODO: need to handle for all
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
  setShowOralResult(false); //TODO: need to handle for all
};
