export const Tooltip = ({ children, title, position }) => {
  return (
    <div className={`tooltip`} data-position={position} data-tool-tip={title}>
      {children}
    </div>
  );
};
