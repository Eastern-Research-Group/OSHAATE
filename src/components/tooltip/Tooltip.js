import React, { useState } from 'react';
import './tooltip.css';

const toolTipText = [
  {
    label: 'unknown',
    text: 'Sum of relevant ingredient(s) with unknown "route name" toxicity.',
  },
  {
    label: 'ingredient',
    text: 'The specific substance contained within the mixture or a mixture within another mixture.',
  },
  {
    label: 'WT',
    text: 'Percent by weight of the ingredient within the mixture.',
  },
  {
    label: 'LD50',
    text: 'Dose (expressed in milligrams per kilogram) of a substance or mixture that kills 50 percent (after single exposure) of animals in an oral or dermal study.',
  },
  {
    label: 'LC50ppm',
    text: 'Concentration of a gas (expressed in parts per million) of a substance or mixture that kills 50 percent (single exposure for 1-4 hours) of animals in an inhalation study.',
  },
  {
    label: 'LC50mglvapors',
    text: 'Concentration of a vapor (expressed in milligrams per liter air) of a substance or mixture that kills 50 percent (single exposure for 1-4 hours) of animals in an inhalation study.',
  },
  {
    label: 'LC50mgldusts',
    text: 'LC50 mg/l - Concentration of a mist, dusts, or particles (expressed in milligrams per liter air) of a substance or mixture that kills 50 percent (single exposure for 1-4 hours) of animals in an inhalation study.',
  },
  {
    label: 'limitdose',
    text: 'This value is used if the only data available for an individual ingredient is a range estimate.',
  },
  {
    label: 'classification',
    text: 'This value is used if the only data available for an individual ingredient is the hazard category for this specific endpoint.',
  },
];

export const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      <span>&#9432;</span>
      {active && (
        <div className={`Tooltip-Tip ${props.direction || 'right'}`}>
          {toolTipText
            .filter((item) => item.label === props.text)
            .map((item) => item.text)}
        </div>
      )}
    </div>
  );
};
