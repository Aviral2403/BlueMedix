import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import '../assets/styles/Forms.css';

const AddProduct = () => {
  const { addProduct } = useContext(UserContext);

  const initialValues = {
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Invalid URL').required('Image URL is required'),
    category: Yup.string().required('Category is required'),
  });

  const onSubmit = (values) => {
    addProduct(values);
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" className="error-message" />
          <Field name="price" type="number" placeholder="Price" />
          <ErrorMessage name="price" component="div" className="error-message" />
          <Field name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" className="error-message" />
          <Field name="image" placeholder="Image URL" />
          <ErrorMessage name="image" component="div" className="error-message" />
          <Field name="category" placeholder="Category" />
          <ErrorMessage name="category" component="div" className="error-message" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;