import React from "react";
import Input from "./input";
import Select from "./select";

function FormController({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    default:
      return null;
  }
}

export default FormController;
