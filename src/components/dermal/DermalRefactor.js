import React, { useState } from 'react';
import DermalInputRefactor from './DermalInputRefactor';
//import { DermalPointEstimate } from './DermalLookup';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import { HandleFormChange, HandleUnknownChange, ValidateRows } from '../Utils';

const DermalRefactor = ({
  category,
  RemoveRow,
  Reset,
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

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <DermalInputRefactor
          category={category}
          inputFields={inputFields}
          setInputFields={setInputFields}
          unknown={unknown}
          setUnknown={setUnknown}
          HandleFormChange={HandleFormChange}
          HandleUnknownChange={HandleUnknownChange}
          setAlertText={setAlertText}
          RemoveRow={RemoveRow}
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
        />
      </form>
    </>
  );
};

export default DermalRefactor;
