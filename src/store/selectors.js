import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = (state) => state.app.products;

export const selectFilteredProducts = createSelector(
  [
    selectProducts, 
    (_, searchTerm) => searchTerm, 
    (_, __, selectedCategory) => selectedCategory, 
    (_, __, ___, sortBy) => sortBy
  ],
  (products, searchTerm, selectedCategory, sortBy) => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') return a.price - b.price;
        return 0;
      });
  }
);
