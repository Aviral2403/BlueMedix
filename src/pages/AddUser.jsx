import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import '../assets/styles/Forms.css';

const AddUser = () => {
  const { addUser } = useContext(UserContext);

  const initialValues = {
    name: { firstname: '', lastname: '' },
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
    }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    addUser(values);
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Field name="name.firstname" placeholder="First Name" />
          <ErrorMessage name="name.firstname" component="div" className="error-message" />
          <Field name="name.lastname" placeholder="Last Name" />
          <ErrorMessage name="name.lastname" component="div" className="error-message" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error-message" />
          <Field name="username" placeholder="Username" />
          <ErrorMessage name="username" component="div" className="error-message" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="error-message" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;