export const Checkbox = ({ id, title, name, handleChange, checked }) => {
  return (
    <>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        {title}
      </label>
    </>
  );
};
