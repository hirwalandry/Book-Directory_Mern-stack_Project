import React from "react";
import { Field, ErrorMessage } from "formik";

function Select({ label, name, options, errors, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        <b>{label}</b>
      </label>

      <Field
        as="select"
        {...rest}
        id={name}
        name={name}
        className="form-control"
      >
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} className="alert alert-warning">
        {(error) => <div className="alert alert-warning">{error}</div>}
      </ErrorMessage>
    </div>
  );
}

export default Select;
