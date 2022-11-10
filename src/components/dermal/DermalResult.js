import React from 'react';
import { dermalCategory } from './DermalLookup';

const DermalResult = ({ dermalResult }) => {
  console.log(dermalResult);
  //console.log(!isFinite(dermalResult));
  //lookup result category
  let dermalResultCat = dermalCategory(dermalResult);
  return (
    <div>
      <br />
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATE mix =
        {isFinite(dermalResult)
          ? ' ' + dermalResult.toLocaleString('en-US') + ' mg/kg '
          : ' Not a Relevant Route of Exposure '}
        ({dermalResultCat})
      </p>
    </div>
  );
};

export default DermalResult;
