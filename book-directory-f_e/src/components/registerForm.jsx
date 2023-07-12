import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormController from "./common/formikController";
import { registerUser } from "../services/userService";
import auth from "../services/authService";

const initialValues = {
  name: { firstname: "", secondname: "" },
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    secondname: Yup.string().required("Secondname is required"),
  }),
  email: Yup.string().email("incorrect email!").required("Email is required."),
  password: Yup.string().min(6).required("Password is required"),
});

function RegisterForm() {
  const [errors, setErrors] = useState({});
  // const validateEmail = (ex) => {
  //   if (ex.response && ex.response.status === 400)
  //     errors.email = ex.response.data;
  //   setErrors(errors);
  //   return errors;
  // };

  const onSubmit = async (values, onSubmitProps) => {
    try {
      const response = await registerUser(values);
      auth.loginWithToken(response.headers["authorization"]);
      window.location = "/";
      onSubmitProps.setSubmitting(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...errors };
        error.email = ex.response.data;
        setErrors(error);
        return error;
      }
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormController
              control="input"
              type="text"
              label="Firstname"
              id="firstname"
              name="name.firstname"
              placeholder="enter your name"
              className="form-control"
            />
            <FormController
              control="input"
              type="text"
              label="Secondname"
              id="secondname"
              name="name.secondname"
              placeholder="enter your name"
              className="form-control"
            />
            <FormController
              control="input"
              type="email"
              label="Email"
              id="email"
              name="email"
              errors={errors.email}
              placeholder="enter your email"
              className="form-control"
            />

            <FormController
              control="input"
              type="password"
              label="Password"
              id="password"
              name="password"
              placeholder="enter your password"
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
