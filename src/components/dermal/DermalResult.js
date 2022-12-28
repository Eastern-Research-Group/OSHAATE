import React from 'react';
import { dermalCategory } from './DermalLookup';

const DermalResult = ({ dermalResult, category }) => {
  //lookup result category
  let dermalResultCat = dermalCategory(dermalResult);
  return (
    <div id="dermalResult" className="results-container">
      <h4>Dermal Exposure Route Result</h4>
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
          : ' Not a Relevant Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default DermalResult;
