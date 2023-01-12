export const Alert = ({ status, text, closePopup }) => {
  return (
    <div className="alert-container">
      <div className="alert-body">
        <p>
          <strong> {text}</strong>
        </p>
        <button onClick={closePopup}>OK</button>
      </div>
    </div>
  );
};
