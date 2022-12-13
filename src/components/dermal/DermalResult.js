import React from 'react';
import { dermalCategory } from './DermalLookup';

const DermalResult = ({ dermalResult, category }) => {
  //lookup result category
  let dermalResultCat = dermalCategory(dermalResult);
  return (
    <div id="dermalResult" className="results-container">
      <h3>Dermal Exposure Route Result</h3>
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
