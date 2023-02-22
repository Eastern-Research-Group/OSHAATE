import React from 'react';
import { DustsCategory } from './DustsLookup';

const DustsResult = ({ dustsResult, category }) => {
  //lookup result category
  let dustsResultCat = DustsCategory(dustsResult);
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
          : ' Not a relevant route of exposure and no ATE calculation is performed'}
      </p>
    </div>
  );
};

export default DustsResult;
