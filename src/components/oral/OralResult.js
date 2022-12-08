import React from 'react';
import { oralCategory } from './OralLookup';

const OralResult = ({ oralResult, category }) => {
  //lookup result category
  let oralResultCat = oralCategory(oralResult);
  return (
    <div id="oralResult">
      <br />
      <hr />
      <h3>Oral Pathway Result</h3>
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
          : ' Not a Relevant ' +
            category +
            '  Route of Exposure (Not Classified)'}
      </p>
    </div>
  );
};

export default OralResult;
