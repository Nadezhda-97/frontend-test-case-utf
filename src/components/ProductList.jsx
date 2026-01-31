import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { fetchProducts } from '../store/thunks';
import { selectFilteredProducts } from '../store/selectors';

import { ProductCard } from './ProductCard';

export function ProductList() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useSelector(state =>
    selectFilteredProducts(state, searchTerm, selectedCategory, sortBy)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-controls">
          {showFilters && (
            <div>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">Все категории</option>
                <option value="phones">Телефоны</option>
                <option value="laptops">Ноутбуки</option>
                <option value="tablets">Планшеты</option>
              </select>
          
              <select value={sortBy} onChange={handleSortChange}>
                <option value="name">По названию</option>
                <option value="price">По цене</option>
              </select>
            </div>
          )}
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}