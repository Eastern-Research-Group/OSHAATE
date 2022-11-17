import React, { useState } from 'react';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
//import Oral from './oral/Oral';
//import OralResult from './oral/OralResult';

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  //const [oralResult, setOralResult] = useState(null);
  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === 'dermal' ? (
        <Dermal dermalResult={dermalResult} setDermalResult={setDermalResult} />
      ) : null}
      {/*{category === 'oral' ? (
        <Oral oralResult={oralResult} setOralResult={setOralResult} />
      ) : null} */}

      {category === 'dermal' ||
      category === 'oral' ||
      category === 'inhalationGases' ||
      category === 'inhalationVapors' ||
      category === 'inhalationDustsMists' ? (
        <div id="results">
          {category === 'dermal' ? (
            <DermalResult dermalResult={dermalResult} />
          ) : null}
          {/*{category === 'oral' ? <OralResult oralResult={oralResult} /> : null}*/}
        </div>
      ) : null}
    </>
  );
};

export default Pathway;
