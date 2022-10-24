import React from "react";
//import DermalInput from "./DermalInput";
import DermalInput from "./DermalInput";
//import OralInput from "./OralInput";

const Pathway = ({ title, category }) => {
  return (
    <>
      <br />
      <h3>{title}</h3>
      {category === "dermal" ? <DermalInput /> : null}
      {/*{category === "oral" ? <OralInput /> : null} */}
    </>
  );
};

export default Pathway;
