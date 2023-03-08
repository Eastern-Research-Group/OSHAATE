//Function to handle row input changes
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

//Function to Remove row
export const RemoveRow = (e, idx, inputFields, setInputFields) => {
  e.preventDefault();
  let data = [...inputFields];
  data.splice(idx, 1);
  setInputFields(data);
};

//Function to Reset rows
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
  let cat = category.toLowerCase();
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
