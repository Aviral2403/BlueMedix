import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/styles/Users.css';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address.city}, {user.address.street}</p>
      </div>
    </div>
  );
};

export default UserDetails;