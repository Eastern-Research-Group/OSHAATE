import React from 'react';
import { GasesCategory } from './GasesLookup';

const GasesResult = ({ gasesResult, category }) => {
  //lookup result category
  let gasesResultCat = GasesCategory(gasesResult);
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
          : ' Not a relevant route of exposure and no ATE calculation is performed'}
      </p>
    </div>
  );
};

export default GasesResult;
