import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

export function withFormLogics(Component) {
  return function (props) {
    const [data, setData] = useState({});
    // const [schema, setSchema] = useState({})
    const [errors, setErrors] = useState({});

    const schema = {
      username: Joi.string().email().required().label("UserName"),
      password: Joi.string().min(6).required().label("Password"),
    };

    const validate = () => {
      const { error } = Joi.validate(data, schema, { abortEarly: false });
      if (!error) return null;

      const errors = {};
      for (let item of error.details)
        if (item.type === "any.empty") errors[item.path[0]] = item.message;

      return errors;
    };
    const validateProperty = ({ name, value }) => {
      const dataProperty = { [name]: value };
      const schemaProperty = { [name]: schema[name] };

      const { error } = Joi.validate(dataProperty, schemaProperty);
      return error ? error.details[0].message : "";
    };
    const handleChange = ({ currentTarget: Input }) => {
      setData({ ...data, [Input.name]: Input.value });
      const errMessage = validateProperty(Input);

      if (errMessage) return (errors[Input.name] = errMessage);
      else delete errors[Input.name];
      setErrors({ ...errors });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validate();
      setErrors(errors || {});
      if (errors) return;
      //ajax call
    };
    return (
      <Component
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        data={data}
        setData={setData}
        validate={validate}
        schema={schema}
      />
    );
  };
}
export default withFormLogics;
