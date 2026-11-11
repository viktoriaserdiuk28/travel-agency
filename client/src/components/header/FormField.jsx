function FormField({
  label,
  option,
  name,
  id,
  type,
  children,
  max,
  min,
  placeholder,
}) {
  return (
    <div className="choose-destination-form-field">
      <label>{label}</label>
      {option === "input" && (
        <input type={type} max={max} min={min} placeholder={placeholder} />
      )}
      {option === "select" && (
        <select name={name} id={id}>
          {children}
        </select>
      )}
    </div>
  );
}

export default FormField;
