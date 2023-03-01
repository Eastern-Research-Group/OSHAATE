export const Alert = ({ text, closePopup }) => {
  return (
    <div className="alert-container">
      <div className="alert-body">
        <p>
          <strong> {text}</strong>
        </p>
        <button
          className="usa-button usa-button--secondary"
          type="button"
          onClick={closePopup}
        >
          OK
        </button>
      </div>
    </div>
  );
};
