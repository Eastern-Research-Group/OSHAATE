import React, { useState } from 'react';
import OralInput from './OralInput';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import {
  HandleFormChange,
  ValidateRows,
  Reset,
  //HandleUnknownChange,
} from '../Utils';

const Oral = ({ category, RemoveRow, setOralResult, setShowOralResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_oral: '',
      weight_oral: '',
      LDLC50_oral: '',
      limitdose_oral: '',
      classification_oral: '',
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
        <OralInput
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
          setOralResult={setOralResult}
          setShowOralResult={setShowOralResult}
        />
      </form>
    </>
  );
};

export default Oral;
