import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  constructor() {
    super();
    this.validateProperty = this.validateProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validate() {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      if (item.type === "any.empty") errors[item.path[0]] = item.message;

    return errors;
  }
  validateProperty({ name, value }) {
    const dataProperty = { [name]: value };
    const schemaProperty = { [name]: this.schema[name] };

    const { error } = Joi.validate(dataProperty, schemaProperty);
    return error ? error.details[0].message : "";
  }
  handleChange({ currentTarget: Input }) {
    const errors = { ...this.state.errors };
    const errMessage = this.validateProperty(Input);

    if (errMessage) errors[Input.name] = errMessage;
    else delete errors[Input.name];

    const data = { ...this.state.data };

    data[Input.name] = Input.value;
    this.setState({ data, errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //ajax call
  }
  renderInput(label, name, placeholder, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  // renderSelect(name, label, options) {
  //   const { data, errors } = this.state;
  //   return (
  //     <Select
  //       name={name}
  //       value={data[name]}
  //       label={label}
  //       options={options}
  //       onChange={this.handleChange}
  //       error={errors[name]}
  //     />
  //   );
  // }
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        login
      </button>
    );
  }
}

export default Form;
