import Pathway from './Pathway';

const PathwayList = (props) => {
  const { pathways } = props;

  const renderPathways = pathways.map(({ id, title, category }) => {
    return (
      <div key={id} className="pathway-container">
        <Pathway title={title} category={category} />
      </div>
    );
  });

  return (
    <>
      <div>{renderPathways}</div>
    </>
  );
};

export default PathwayList;
