import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AppContext';
import UserList from '../components/UserList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../assets/styles/Users.css';

const Users = () => {
  const { users, deleteUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Filter users by search term (handles spaces)
  const filteredUsers = users.filter((user) => {
    const searchParts = searchTerm.toLowerCase().split(' ');
    const fullName = `${user.name.firstname} ${user.name.lastname}`.toLowerCase();
    return searchParts.every((part) => fullName.includes(part));
  });

  // Sort users based on selected option
  const sortedUsers = filteredUsers.sort((a, b) => {
    const nameA = `${a.name.firstname} ${a.name.lastname}`.toLowerCase();
    const nameB = `${b.name.firstname} ${b.name.lastname}`.toLowerCase();

    switch (sortOrder) {
      case 'A-Z':
        return nameA.localeCompare(nameB);
      case 'Z-A':
        return nameB.localeCompare(nameA);
      case 'Newest First':
        return b.id - a.id;
      case 'Oldest First':
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="users-page">
      <h2>Users</h2>
      <div className="filters">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search users..." />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-filter"
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>
      <UserList users={currentUsers} deleteUser={deleteUser} />
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Users;