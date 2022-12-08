import React from 'react';
import { dermalCategory } from './DermalLookup';

const DermalResult = ({ dermalResult, category }) => {
  //console.log(dermalResult);
  //lookup result category
  let dermalResultCat = dermalCategory(dermalResult);
  return (
    <div id="dermalResult">
      <br />
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATE mix ={' '}
        {dermalResult !== null
          ? ' ' +
            dermalResult.toLocaleString('en-US') +
            ' mg/kg (' +
            category +
            ' ' +
            dermalResultCat +
            ')'
          : ' Not a Relevant ' +
            category +
            ' Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default DermalResult;
