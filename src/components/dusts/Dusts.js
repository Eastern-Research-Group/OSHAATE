import React, { useState } from 'react';
import DustsInput from './DustsInput';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import {
  HandleFormChange,
  ValidateRows,
  Reset,
  //HandleUnknownChange,
} from '../Utils';

const Dusts = ({ category, RemoveRow, setDustsResult, setShowDustsResult }) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_dusts: '',
      weight_dusts: '',
      LDLC50_dusts: '',
      limitdose_dusts: '',
      classification_dusts: '',
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
        <DustsInput
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
          setDustsResult={setDustsResult}
          setShowDustsResult={setShowDustsResult}
        />
      </form>
    </>
  );
};

export default Dusts;
