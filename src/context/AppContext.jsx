import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Load users and products from localStorage on initial render
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products')) || []
  );

  // Save users and products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Fetch data from FakeStore API on component mount (only once)
  useEffect(() => {
    const fetchData = async () => {
      // Check if data has already been fetched
      if (users.length === 0 && products.length === 0) {
        try {
          const usersResponse = await axios.get('https://fakestoreapi.com/users');
          setUsers(usersResponse.data);

          const productsResponse = await axios.get('https://fakestoreapi.com/products');
          setProducts(productsResponse.data);
        } catch (error) {
          console.error('Failed to fetch data from FakeStore API.', error);
          toast.error('Failed to fetch data from FakeStore API.');
        }
      }
    };

    fetchData();
  }, [users.length, products.length]); // Only run if users and products are empty

  // Add a user to local state
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, { ...user, id: prevUsers.length + 1 }]);
    toast.success('User added successfully!');
  };

  // Edit a user in local state
  const editUser = (id, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
    toast.success('User updated successfully!');
  };

  // Delete a user from local state
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    toast.success('User deleted successfully!');
  };

  // Add a product to local state
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { ...product, id: prevProducts.length + 1 }]);
    toast.success('Product added successfully!');
  };

  // Edit a product in local state
  const editProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
    );
    toast.success('Product updated successfully!');
  };

  // Delete a product from local state
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    toast.success('Product deleted successfully!');
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        editUser,
        deleteUser,
        products,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};