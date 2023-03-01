export const Buttons = ({
  ValidateRows,
  inputFields,
  setInputFields,
  setOpenAlert,
  setAlertText,
  category,
  unknown,
  setUnknown,
  setOralResult,
  setShowOralResult,
  setDermalResult,
  setShowDermalResult,
  setGasesResult,
  setShowGasesResult,
  setVaporsResult,
  setShowVaporsResult,
  setDustsResult,
  setShowDustsResult,
  Reset,
}) => {
  return (
    <>
      <button
        className="usa-button usa-button--outline"
        type="button"
        id="add"
        onClick={(e) =>
          ValidateRows(
            e,
            inputFields,
            setInputFields,
            setOpenAlert,
            setAlertText,
            category
          )
        }
      >
        Add Ingredient
      </button>
      <button
        className="usa-button usa-button--outline"
        type="button"
        id="reset"
        onClick={(e) =>
          Reset(
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
          )
        }
      >
        Reset
      </button>
      <button
        className="usa-button"
        type="button"
        id="calculate"
        onClick={(e) =>
          ValidateRows(
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
          )
        }
      >
        Calculate
      </button>
    </>
  );
};
