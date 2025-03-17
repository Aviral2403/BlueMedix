import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Users.css';

const UserList = ({ users, deleteUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name.firstname} {user.name.lastname}</h3>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <div className="user-actions">
            <Link to={`/edit-user/${user.id}`} className="edit">Edit</Link>
            <button className="delete" onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;