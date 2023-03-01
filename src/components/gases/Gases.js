import React, { useState } from 'react';
import GasesInput from './GasesInput';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import {
  HandleFormChange,
  ValidateRows,
  Reset,
  //HandleUnknownChange,
} from '../Utils';

const Gases = ({ category, RemoveRow, setGasesResult, setShowGasesResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_gases: '',
      weight_gases: '',
      LDLC50_gases: '',
      limitdose_gases: '',
      classification_gases: '',
    },
  ]);

  //let [unknown, setUnknown] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  return (
    <>
      {openAlert ? (
        <Alert text={alertText} closePopup={() => setOpenAlert(false)} />
      ) : null}
      <form>
        <GasesInput
          category={category}
          inputFields={inputFields}
          setInputFields={setInputFields}
          HandleFormChange={HandleFormChange}
          setAlertText={setAlertText}
          RemoveRow={RemoveRow}
          //unknown={unknown}
          //setUnknown={setUnknown}
          //HandleUnknownChange={HandleUnknownChange}
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
          setGasesResult={setGasesResult}
          setShowGasesResult={setShowGasesResult}
        />
      </form>
    </>
  );
};

export default Gases;
