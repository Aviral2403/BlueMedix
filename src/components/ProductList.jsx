import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Products.css';

const ProductList = ({ products, deleteProduct }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`} className="product-link">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </Link>
          <div className="product-actions">
            <Link to={`/edit-product/${product.id}`} className="edit">Edit</Link>
            <button className="delete" onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;