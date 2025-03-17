import React, { useContext } from 'react';
import { UserContext } from '../context/AppContext';
import Chart from '../components/Chart';
import '../assets/styles/Home.css';

const Home = () => {
  const { users, products } = useContext(UserContext);

  const totalUsers = users.length;
  const totalProducts = products.length;
  const recentUsers = users.slice(-5);
  const recentProducts = products.slice(-5);

  return (
    <div className="home-page">
      <h1>Dashboard</h1>
      <div className="metrics">
        <div className="metric-card">
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="metric-card">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
      </div>
      <div className="recent-data">
        <div className="recent-users">
          <h2>Recent Users</h2>
          <ul>
            {recentUsers.map((user) => (
              <li key={user.id}>
                {user.name.firstname} {user.name.lastname}
              </li>
            ))}
          </ul>
        </div>
        <div className="recent-products">
          <h2>Recent Products</h2>
          <ul>
            {recentProducts.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chart-container">
        <Chart users={users} products={products} />
      </div>
    </div>
  );
};

export default Home;