import React from 'react';
//import { oralCategory } from './OralLookup';

const OralResult = ({ oralResult }) => {
  //lookup result category
  //let oralResultCat = oralCategory(oralResult);
  return (
    <div id="oralResult">
      <br />
      <hr />
      <h3>Oral Pathway Result</h3>
      <p>
        Oral ATE mix ={' '}
        {/*{oralResult.toLocaleString('en-US') +
          ' mg/kg (' +
          //oralResultCat +
  ')'} */}
      </p>
    </div>
  );
};

export default OralResult;
