import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';

function FoodItem(props) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { category, country } = props;
    fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${category}&search_countries=${country}&json=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to fetch products from API');
        }
        return response.json();
      })
      .then(data => {
        if (data.products.length === 0) {
          throw new Error('No products found for selected category and country');
        }
        setProducts(data.products);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [props]);

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <NavBar />
      {products.map((product) => (
        <div key={product.code}>
          <h2>{product.product_name}</h2>
          <img src={product.image_front_url} alt={product.product_name} />
          <p>Nutrition facts:</p>
          <ul>
            <li>Calories: {product.nutriments.energy_value}</li>
            <li>Protein: {product.nutriments.proteins_value} g</li>
            <li>Fat: {product.nutriments.fat_value} g</li>
            <li>Carbohydrates: {product.nutriments.carbohydrates_value} g</li>
            <li>Nutrition Grade: {product.nutrition_grade_fr}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default FoodItem;
