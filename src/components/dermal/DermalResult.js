import React from 'react';
import { dermalCategory } from './DermalLookup';

const DermalResult = ({ dermalResult }) => {
  //lookup result category
  let dermalResultCat = dermalCategory(dermalResult);
  return (
    <div id="dermalResult">
      <br />
      <hr />
      <h3>Dermal Pathway Result</h3>
      <p>
        Dermal ATE mix ={' '}
        {dermalResult.toLocaleString('en-US') +
          ' mg/kg (' +
          dermalResultCat +
          ')'}
      </p>
    </div>
  );
};

export default DermalResult;
