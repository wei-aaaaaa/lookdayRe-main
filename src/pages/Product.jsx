import React, { useState, useEffect} from 'react';
import './Product.scss';

const Product = () => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [products, setProducts] = useState([
    { id: 1, name: 'Taipei 101 Tour', category: '觀光', price: 200, region: '信義', rating: 4.5, date: '2024-06-10', description: 'Visit the famous Taipei 101', image: 'src/assets/images/activities/101.jpg' },
    { id: 2, name: 'Night Market Tour', category: '食物', price: 150, region: '士林', rating: 4.0, date: '2024-06-12', description: 'Explore the local night markets', image: 'src/assets/images/activities/shihlin.png' },
    { id: 3, name: '台南 | 山線包車一日遊：龍貓車站', category: '景觀', price: 600, region: '臺南', rating: 4.2, date: '2024-07-18', description: '前往大內龍貓車站，在彩繪塗鴉村落中，尋找童年', image: 'src/assets/images/activities/drgcat.png' },
    // 添加更多假數據
  ]);

  const categories = [...new Set(products.map(product => product.category))];
  const regions = [...new Set(products.map(product => product.region))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ActivityAPI');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(filter.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedRegion === '' || product.region === selectedRegion) &&
      (minPrice === '' || product.price >= parseFloat(minPrice)) &&
      (maxPrice === '' || product.price <= parseFloat(maxPrice)) &&
      (selectedDate === '' || product.date === selectedDate)
    );
  });

  if (selectedSort === 'priceHigh') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'ratingHigh') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="product-page">
      <header className="header">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="search-bar"
        />
      </header>
      <div className="content">
        <aside className="filter-section">
          <h2>Filters</h2>
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Region:</label>
            <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
              <option value="">All</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Sort By:</label>
            <select value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
              <option value="">None</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="ratingHigh">Rating: High to Low</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
        </aside>
        <main className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Region: {product.region}</p>
                <p>Rating: {product.rating}</p>
                <p>Date: {product.date}</p>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && <p>No products found</p>}
        </main>
      </div>
    </div>
  );
};

export default Product;
