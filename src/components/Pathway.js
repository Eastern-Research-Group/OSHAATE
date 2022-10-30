import React from 'react';
import { useState } from 'react';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
//import OralInput from "./OralInput";

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  //const [dermalResultCat, setDermalResultCat] = useState(null);

  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === 'dermal' ? (
        <Dermal dermalResult={dermalResult} setDermalResult={setDermalResult} />
      ) : null}
      {/*{category === "oral" ? <OralInput /> : null} */}

      <div id="results">
        {category === 'dermal' ? (
          <DermalResult dermalResult={dermalResult} />
        ) : null}
      </div>
    </>
  );
};

export default Pathway;
