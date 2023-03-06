export const Buttons = ({ validateRows, reset }) => {
  return (
    <>
      <button
        className="usa-button usa-button--outline"
        type="button"
        id="add"
        onClick={validateRows}
      >
        Add Ingredient
      </button>
      <button
        className="usa-button usa-button--outline"
        type="button"
        id="reset"
        onClick={reset}
      >
        Reset
      </button>
      <button
        className="usa-button"
        type="button"
        id="calculate"
        onClick={validateRows}
      >
        Calculate
      </button>
    </>
  );
};
