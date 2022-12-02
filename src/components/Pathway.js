import React, { useState } from 'react';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
import Oral from './oral/Oral';
import OralResult from './oral/OralResult';

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  let [showDermalResult, setShowDermalResult] = useState(false);
  const [oralResult, setOralResult] = useState(null);
  let [showOralResult, setShowOralResult] = useState(false);
  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === 'dermal' ? (
        <Dermal
          dermalResult={dermalResult}
          setDermalResult={setDermalResult}
          showDermalResult={showDermalResult}
          setShowDermalResult={setShowDermalResult}
        />
      ) : null}
      {category === 'oral' ? (
        <Oral
          oralResult={oralResult}
          setOralResult={setOralResult}
          showOralResult={showOralResult}
          setShowOralResult={setShowOralResult}
        />
      ) : null}

      {category === 'dermal' ||
      category === 'oral' ||
      category === 'inhalationGases' ||
      category === 'inhalationVapors' ||
      category === 'inhalationDustsMists' ? (
        <div id="results">
          {category === 'dermal' && showDermalResult ? (
            <DermalResult
              dermalResult={dermalResult}
              showDermalResult={showDermalResult}
            />
          ) : null}
          {category === 'oral' && showOralResult ? (
            <OralResult
              oralResult={oralResult}
              showOralResult={showOralResult}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pathway;
