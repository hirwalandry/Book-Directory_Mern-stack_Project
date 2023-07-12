import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { getUsers } from "../services/userService";
import { addBook, getBook } from "../services/bookServices";
import FormikController from "./common/formikController";

const initialValues = {
  title: "",
  author: "",
  user: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("required"),
  author: Yup.string().min(6).required("required"),
  user: Yup.string().required("required"),
});

const onSubmit = async (values, onSubmitProps) => {
  await addBook(values);
  onSubmitProps.setSubmitting(false);
  window.location = "/";
};

function BookForm() {
  const [formValues, setFormValues] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    const getsUsers = async () => {
      const result = await getUsers();
      setUsers([{ _id: "", name: "Select your name" }, ...result.data]);
    };
    const getsBook = async () => {
      if (bookId === "new") return;

      try {
        const result = await getBook(bookId);

        setFormValues(mapToViewModel(result.data));
      } catch (error) {}
    };

    getsUsers();
    getsBook();
  }, []);

  const mapToViewModel = (book) => {
    return {
      _id: book._id,
      title: book.title,
      author: book.author,
      user: book.user._id,
    };
  };
  return (
    <div>
      <h2>Book</h2>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <FormikController
                control="input"
                label="title"
                id="title"
                name="title"
                placeholder="enter your title"
                className="form-control"
              />
              <FormikController
                control="input"
                label="Author"
                id="author"
                name="author"
                placeholder="enter your author"
                className="form-control"
              />
              <FormikController
                control="select"
                options={users}
                label="User"
                id="user"
                name="user"
                className="form-control"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                save
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BookForm;
