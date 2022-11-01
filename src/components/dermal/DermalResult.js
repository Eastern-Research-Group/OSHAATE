import React from 'react';

const DermalResult = ({ dermalResult, dermalResultCat }) => {
  return (
    <div>
      <br />
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATEmix = {dermalResult.toLocaleString('en-US')} mg/kg (
        {dermalResultCat})
      </p>
    </div>
  );
};

export default DermalResult;
