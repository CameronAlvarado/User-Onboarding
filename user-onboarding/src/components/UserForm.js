import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Field, withFormik, Formik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  console.log("this is touched", touched);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [users, status]);

  return (
    <div className="Form">
        <h1>User Form 1.5</h1>
        <Formik>
            <Form className="Form-at">
              <Field 
                className="field" 
                type="text" 
                name="name" 
                placeholder="Name goes here" />
                {touched.name && errors.name && (
                  <p className="error">{errors.name}</p>
                )}

              <Field 
                className="field" 
                type="text" 
                name="email" 
                placeholder="Email goes here" />
                {touched.email && errors.email && (
                  <p className="error">{errors.email}</p>
                )}

              <Field 
                className="field" 
                type="password" 
                name="password" 
                placeholder="Password goes here" />
                {touched.password && errors.password && (
                  <p className="error">{errors.password}</p>
                )}
                
                <label 
              className="checkbox-container">
                I Agree to the Terms of Services
                <Field
                  className="field" 
                  type="checkbox"
                  name="terms"
                  checked={values.vaccinations}
                />
                <span className="checkmark" />
              </label>
              <button className="field" type="submit">Submit!</button>
            </Form>
          </Formik>
    </div>
  );
}

const FormikUserForm = withFormik({

  mapPropsToValues({ name, email, password, terms }) {
    return {
      terms: terms || false,
      name: name || "",
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      // values is our object with all our data on it.
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm); // currying functions in Javascript
console.log("This is the HOC", FormikUserForm)
export default FormikUserForm;