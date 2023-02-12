import React from 'react';
import CategoryItem from '../categories/CategoryItem';

const Categories = ({ categories }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default Categories;

