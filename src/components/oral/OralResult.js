import React from 'react';
import { oralCategory } from './OralLookup';

const OralResult = ({ oralResult, category }) => {
  //lookup result category
  let oralResultCat = oralCategory(oralResult);
  return (
    <div id="oralResult" className="results-container">
      <h4>Oral Exposure Route Result</h4>
      <p>
        Oral ATE mix ={' '}
        {oralResult !== null
          ? ' ' +
            oralResult.toLocaleString('en-US') +
            ' mg/kg (' +
            category +
            ' ' +
            oralResultCat +
            ')'
          : ' Not a Relevant Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default OralResult;
