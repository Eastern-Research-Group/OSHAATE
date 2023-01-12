import React from 'react';
import { vaporsCategory } from './VaporsLookup';

const VaporsResult = ({ vaporsResult, category }) => {
  //lookup result category
  let vaporsResultCat = vaporsCategory(vaporsResult);
  return (
    <div id="vaporsResult" className="results-container">
      <h4>Inhalation - Vapors Exposure Route Result</h4>
      <p>
        Inhalation - Vapors ATE mix ={' '}
        {vaporsResult !== null
          ? ' ' +
            vaporsResult.toLocaleString('en-US') +
            ' mg/l (Inhalation - ' +
            category +
            ' ' +
            vaporsResultCat +
            ')'
          : ' Not a relevant route of exposure and no ATE calculation is performed'}
      </p>
    </div>
  );
};

export default VaporsResult;
