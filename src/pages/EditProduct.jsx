import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import '../assets/styles/Forms.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, editProduct } = useContext(UserContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productToEdit = products.find((product) => product.id === parseInt(id));
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      navigate('/products');
    }
  }, [id, products, navigate]);

  if (!product) return <div>Loading...</div>;

  const initialValues = {
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Invalid URL').required('Image URL is required'),
    category: Yup.string().required('Category is required'),
  });

  const onSubmit = (values) => {
    editProduct(product.id, values);
    navigate('/products');
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
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

export default EditProduct;