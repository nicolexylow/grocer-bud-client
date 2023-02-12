import React from 'react';
import CategoryItem from '../categories/CategoryItem';
import AddCategory from './AddCategory'

const Categories = ({ categories }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
            <AddCategory />
    </div>
  );
};

export default Categories;

