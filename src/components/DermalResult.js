import React from 'react';

const DermalResult = ({ dermalResult }) => {
  return (
    <div>
      <h3>Dermal Pathway Result</h3>
      <p>Dermal ATEmix = {dermalResult} mg/kg [ DERMAL CATEGORY ]</p>
    </div>
  );
};

export default DermalResult;
