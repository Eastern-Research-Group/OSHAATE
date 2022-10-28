import React from 'react';

const DermalResult = ({ dermalResult }) => {
  return (
    <div>
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATEmix = <strong>{dermalResult} mg/kg</strong> [DERMAL CATEGORY]
      </p>
    </div>
  );
};

export default DermalResult;
