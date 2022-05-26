const Input = ({ register, name, label, error = "", ...rest }) => {
  // console.log(register);
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
