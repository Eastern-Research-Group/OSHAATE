import React from 'react';
import { gasesCategory } from './GasesLookup';

const GasesResult = ({ gasesResult, category }) => {
  //lookup result category
  let gasesResultCat = gasesCategory(gasesResult);
  return (
    <div id="gasesResult" className="results-container">
      <h4>Inhalation - Gases Exposure Route Result</h4>
      <p>
        Inhalation - Gases ATE mix ={' '}
        {gasesResult !== null
          ? ' ' +
            gasesResult.toLocaleString('en-US') +
            ' ppmV (Inhalation - ' +
            category +
            ' ' +
            gasesResultCat +
            ')'
          : ' Not a Relevant Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default GasesResult;
