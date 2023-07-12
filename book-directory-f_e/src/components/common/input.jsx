import React from "react";
import { Field, ErrorMessage } from "formik";

function Input({ label, name, errors, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        <b>{label}</b>
      </label>
      <Field {...rest} id={name} name={name} className="form-control" />
      <ErrorMessage name={name} className="alert alert-warning">
        {(error) => <div className="alert alert-warning">{error}</div>}
      </ErrorMessage>
      {errors && <div className="alert alert-warning">{errors}</div>}
    </div>
  );
}

export default Input;
