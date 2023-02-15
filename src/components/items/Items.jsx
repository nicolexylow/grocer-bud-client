import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 

function Items() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    // Fetch products from API only when an item has been added
    if (itemAdded) {
      fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_countries=&json=1`)
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
    }
  }, [itemAdded]);

  const handleItemAdded = () => {
    setItemAdded(true);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>Items Page</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.code}>
              <Link to={`/item/${product.code}`}>
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
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No items found. Please add a new item.</div>
      )}
      <Link to="/AddItemForm">
        <button onClick={handleItemAdded}>Add Item</button>
      </Link>
    </div>
  );
}

export default Items;