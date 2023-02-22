export const Buttons = ({
  ValidateRows,
  inputFields,
  setInputFields,
  setOpenAlert,
  setAlertText,
  Reset,
  category,
}) => {
  return (
    <>
      <button
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
      <button type="button" id="reset" onClick={Reset}>
        Reset
      </button>
      <button
        type="button"
        id="calculate"
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
        Calculate
      </button>
    </>
  );
};
