const Input = ({ register, name, label, error = "", ...rest }) => {
  return (
    <>
      <span>
        {label} {!!error && <span> - {error}</span>}
      </span>
      <input {...register(name)} {...rest}></input>
    </>
  );
};

export default Input;
