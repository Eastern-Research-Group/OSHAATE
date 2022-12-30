import React from 'react';
import { dustsCategory } from './DustsLookup';

const DustsResult = ({ dustsResult, category }) => {
  //lookup result category
  let dustsResultCat = dustsCategory(dustsResult);
  return (
    <div id="dustsResult" className="results-container">
      <h4>Inhalation - Dusts/Mists Exposure Route Result</h4>
      <p>
        Inhalation - Dusts/Mists ATE mix ={' '}
        {dustsResult !== null
          ? ' ' +
            dustsResult.toLocaleString('en-US') +
            ' mg/l (Inhalation - ' +
            category +
            '/Mists ' +
            dustsResultCat +
            ')'
          : ' Not a Relevant Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default DustsResult;
