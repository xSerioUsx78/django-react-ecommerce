const Button = ({ className, text, type, loading, ...rest }) => {
  return loading ? (
    <button className={`btn btn-${className}`} type={type} disabled>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></span>
      {text} ...
    </button>
  ) : (
    <button className={`btn btn-${className}`} type={type} {...rest}>
      {text}
    </button>
  );
};

export default Button;
