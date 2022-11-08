import React, { useState } from 'react';
import Dermal from './dermal/Dermal';
import DermalResult from './dermal/DermalResult';
//import OralInput from "./OralInput";

const Pathway = ({ title, category }) => {
  const [dermalResult, setDermalResult] = useState(null);
  const [dermalResultCat, setDermalResultCat] = useState('');

  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === 'dermal' ? (
        <Dermal
          dermalResult={dermalResult}
          setDermalResult={setDermalResult}
          dermalResultCat={dermalResultCat}
          setDermalResultCat={setDermalResultCat}
        />
      ) : null}
      {/*{category === "oral" ? <OralInput /> : null} */}

      {(category === 'dermal' && dermalResult !== null) ||
      category === 'oral' ||
      category === 'inhalationGases' ||
      category === 'inhalationVapors' ||
      category === 'inhalationDustsMists' ? (
        <div id="results">
          {category === 'dermal' ? (
            <DermalResult
              dermalResult={dermalResult}
              dermalResultCat={dermalResultCat}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pathway;
