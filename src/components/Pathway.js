import React, { useState } from 'react';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
import Oral from './oral/Oral';
import OralResult from './oral/OralResult';
import Gases from './gases/Gases';
import GasesResult from './gases/GasesResult';

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  let [showDermalResult, setShowDermalResult] = useState(false);
  const [oralResult, setOralResult] = useState(null);
  let [showOralResult, setShowOralResult] = useState(false);
  const [gasesResult, setGasesResult] = useState(null);
  let [showGasesResult, setShowGasesResult] = useState(false);
  return (
    <>
      <h3>{title}</h3>
      {category === 'Dermal' ? (
        <Dermal
          dermalResult={dermalResult}
          setDermalResult={setDermalResult}
          showDermalResult={showDermalResult}
          setShowDermalResult={setShowDermalResult}
        />
      ) : null}
      {category === 'Oral' ? (
        <Oral
          oralResult={oralResult}
          setOralResult={setOralResult}
          showOralResult={showOralResult}
          setShowOralResult={setShowOralResult}
        />
      ) : null}

      {category === 'Gases' ? (
        <Gases
          gasesResult={gasesResult}
          setGasesResult={setGasesResult}
          showGasesResult={showGasesResult}
          setShowGasesResult={setShowGasesResult}
        />
      ) : null}

      {category === 'Dermal' ||
      category === 'Oral' ||
      category === 'Gases' ||
      category === 'Vapors' ||
      category === 'Dusts' ? (
        <div id="results">
          {category === 'Dermal' && showDermalResult ? (
            <DermalResult
              dermalResult={dermalResult}
              showDermalResult={showDermalResult}
              category={category}
            />
          ) : null}
          {category === 'Oral' && showOralResult ? (
            <OralResult
              oralResult={oralResult}
              showOralResult={showOralResult}
              category={category}
            />
          ) : null}
          {category === 'Gases' && showGasesResult ? (
            <GasesResult
              gasesResult={gasesResult}
              showGasesResult={showGasesResult}
              category={category}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pathway;
