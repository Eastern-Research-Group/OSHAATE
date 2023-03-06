export const Tooltip = ({ children }) => {
  return (
    <div
      className={`tooltip`}
      data-tool-tip={`Sum of relevant ingredient(s) with unknown "route name" toxicity.`}
    >
      {children}
    </div>
  );
};
