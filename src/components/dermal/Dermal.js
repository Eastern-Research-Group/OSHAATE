import React, { useState } from 'react';
import DermalInput from './DermalInput';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import { HandleFormChange, ValidateRows, Reset } from '../Utils';

const Dermal = ({
  category,
  RemoveRow,
  setDermalResult,
  setShowDermalResult,
}) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_dermal: '',
      weight_dermal: '',
      LDLC50_dermal: '',
      limitdose_dermal: '',
      classification_dermal: '',
    },
  ]);

  let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleUnknownChange = (e, setUnknown) => {
    setUnknown(e.target.value);
  };

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <DermalInput
          category={category}
          inputFields={inputFields}
          setInputFields={setInputFields}
          HandleFormChange={HandleFormChange}
          setAlertText={setAlertText}
          RemoveRow={RemoveRow}
          unknown={unknown}
          setUnknown={setUnknown}
          handleUnknownChange={handleUnknownChange}
        />
        <Buttons
          category={category}
          ValidateRows={ValidateRows}
          Reset={Reset}
          inputFields={inputFields}
          setInputFields={setInputFields}
          setOpenAlert={setOpenAlert}
          setAlertText={setAlertText}
          RemoveRow={RemoveRow}
          setDermalResult={setDermalResult}
          setShowDermalResult={setShowDermalResult}
          unknown={unknown}
          setUnknown={setUnknown}
          handleUnknownChange={handleUnknownChange}
        />
      </form>
    </>
  );
};

export default Dermal;
