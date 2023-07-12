import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormController from "./common/formikController";
import auth from "../services/authService";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

function LoginForm(props) {
  const { state } = useLocation();

  let [errors, setErrors] = useState({});
  const onSubmit = async (values, onSubmitProps) => {
    try {
      await auth.loginUser(values.email, values.password);
      onSubmitProps.setSubmitting(false);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...errors };
        error.email = ex.response.data;
        setErrors(error);
      }
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormController
                control="input"
                type="text"
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
                login
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
