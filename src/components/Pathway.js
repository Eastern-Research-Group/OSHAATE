import React, { useState } from 'react';
//import Common from './Common';
//import Dermal from './dermal/Dermal';
import DermalRefactor from './dermal/DermalRefactor';
import DermalResult from './dermal/DermalResult';
//import Oral from './oral/Oral';
import OralRefactor from './oral/OralRefactor';
import OralResult from './oral/OralResult';
import Gases from './gases/Gases';
import GasesResult from './gases/GasesResult';
import Vapors from './vapors/Vapors';
import VaporsResult from './vapors/VaporsResult';
import Dusts from './dusts/Dusts';
import DustsResult from './dusts/DustsResult';

const Pathway = ({ title, category }) => {
  const [oralResult, setOralResult] = useState(null);
  const [showOralResult, setShowOralResult] = useState(false);
  const [dermalResult, setDermalResult] = useState(null);
  const [showDermalResult, setShowDermalResult] = useState(false);
  const [gasesResult, setGasesResult] = useState(null);
  const [showGasesResult, setShowGasesResult] = useState(false);
  const [vaporsResult, setVaporsResult] = useState(null);
  const [showVaporsResult, setShowVaporsResult] = useState(false);
  const [dustsResult, setDustsResult] = useState(null);
  const [showDustsResult, setShowDustsResult] = useState(false);

  return (
    <>
      <h3>{title}</h3>

      {category === 'Dermal' ? (
        <DermalRefactor
          category={category}
          dermalResult={dermalResult}
          setDermalResult={setDermalResult}
          showDermalResult={showDermalResult}
          setShowDermalResult={setShowDermalResult}
        />
      ) : null}
      {category === 'Oral' ? (
        <OralRefactor
          category={category}
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
      {category === 'Vapors' ? (
        <Vapors
          vaporsResult={vaporsResult}
          setVaporsResult={setVaporsResult}
          showVaporsResult={showVaporsResult}
          setShowVaporsResult={setShowVaporsResult}
        />
      ) : null}
      {category === 'Dusts' ? (
        <Dusts
          dustsResult={dustsResult}
          setDustsResult={setDustsResult}
          showDustsResult={showDustsResult}
          setShowDustsResult={setShowDustsResult}
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
          {category === 'Vapors' && showVaporsResult ? (
            <VaporsResult
              vaporsResult={vaporsResult}
              showVaporsResult={showVaporsResult}
              category={category}
            />
          ) : null}
          {category === 'Dusts' && showDustsResult ? (
            <DustsResult
              dustsResult={dustsResult}
              showDustsResult={showDustsResult}
              category={category}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pathway;
