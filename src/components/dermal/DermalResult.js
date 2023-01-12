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
          : ' Not a relevant route of exposure and no ATE calculation is performed'}
      </p>
    </div>
  );
};

export default DermalResult;
