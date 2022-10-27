import React from 'react';
//import { useState } from 'react';
import DermalInput from './DermalInput';
//import DermalResult from './DermalResult';
//import OralInput from "./OralInput";

const Pathway = ({ title, category }) => {
  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === 'dermal' ? <DermalInput /> : null}
      {/*{category === "oral" ? <OralInput /> : null} */}

      <div id="results">
        {/*<hr />
        {category === 'dermal' ? <DermalResult /> : null}
  */}
      </div>
    </>
  );
};

export default Pathway;
