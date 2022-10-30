import React from 'react';

const DermalResult = ({ dermalResult }) => {
  // ,dermalResultCat
  return (
    <div>
      <br />
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATEmix = <strong>{dermalResult} mg/kg</strong>{' '}
        {/*({dermalResultCat}*/}
      </p>
    </div>
  );
};

export default DermalResult;
