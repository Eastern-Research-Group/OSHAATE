import React, { useState } from 'react';
import VaporsInput from './VaporsInput';
import { Buttons } from '../Buttons';
import { Alert } from '../Alert';
import {
  HandleFormChange,
  ValidateRows,
  Reset,
  //HandleUnknownChange,
} from '../Utils';

const Vapors = ({
  category,
  RemoveRow,
  setVaporsResult,
  setShowVaporsResult,
}) => {
  const [inputFields, setInputFields] = useState([
    {
      ingredient_vapors: '',
      weight_vapors: '',
      LDLC50_vapors: '',
      limitdose_vapors: '',
      classification_vapors: '',
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
        <VaporsInput
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
          setVaporsResult={setVaporsResult}
          setShowVaporsResult={setShowVaporsResult}
        />
      </form>
    </>
  );
};

export default Vapors;
