import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AppContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import '../assets/styles/Products.css';

const Products = () => {
  const { products, deleteProduct } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('High to Low');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Get unique categories for the filter dropdown
  const categories = ['All', ...new Set(products.map((product) => product.category))];

  // Filter products by search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOrder) {
      case 'High to Low':
        return b.price - a.price;
      case 'Low to High':
        return a.price - b.price;
      case 'Newest First':
        return b.id - a.id;
      case 'Oldest First':
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="filters">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search products..." />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-filter"
        >
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>
      <ProductList products={currentProducts} deleteProduct={deleteProduct} />
      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Products;