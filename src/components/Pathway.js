import React, { useState } from 'react';
//import Common from './Common';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
import OralRefactor from './oral/Oral';
import OralResult from './oral/OralResult';
import Gases from './gases/Gases';
import GasesResult from './gases/GasesResult';
import Vapors from './vapors/Vapors';
import VaporsResult from './vapors/VaporsResult';
import Dusts from './dusts/Dusts';
import DustsResult from './dusts/DustsResult';

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  let [showDermalResult, setShowDermalResult] = useState(false);
  const [oralResult, setOralResult] = useState(null);
  let [showOralResult, setShowOralResult] = useState(false);
  const [gasesResult, setGasesResult] = useState(null);
  let [showGasesResult, setShowGasesResult] = useState(false);
  const [vaporsResult, setVaporsResult] = useState(null);
  let [showVaporsResult, setShowVaporsResult] = useState(false);
  const [dustsResult, setDustsResult] = useState(null);
  let [showDustsResult, setShowDustsResult] = useState(false);

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
        <OralRefactor
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

      {/*{category === 'Dermal' ? (
        <Common
          category={category}
          obj={obj}
          dermalResult={dermalResult}
          setResult={setDermalResult}
          showResult={showDermalResult}
          setShowResult={setShowDermalResult}
        />
      ) : null}
      {category === 'Oral' ? (
        <Common
          category={category}
          obj={obj}
          oralResult={oralResult}
          setResult={setOralResult}
          showResult={showOralResult}
          setShowResult={setShowOralResult}
        />
      ) : null}
      {category === 'Gases' ? (
        <Common
          category={category}
          obj={obj}
          gasesResult={gasesResult}
          setResult={setGasesResult}
          showResult={showGasesResult}
          setShowResult={setShowGasesResult}
        />
      ) : null}
      {category === 'Vapors' ? (
        <Common
          category={category}
          obj={obj}
          vaporsResult={vaporsResult}
          setResult={setVaporsResult}
          showResult={showVaporsResult}
          setShowResult={setShowVaporsResult}
        />
      ) : null}
      {category === 'Dusts' ? (
        <Common
          category={category}
          obj={obj}
          dustsResult={dustsResult}
          setResult={setDustsResult}
          showResult={showDustsResult}
          setShowResult={setShowDustsResult}
        />
      ) : null}*/}

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
