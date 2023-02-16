import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase'
import { collection, getDocs } from "firebase/firestore"; 
import { useParams } from 'react-router-dom';

export const Items = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  const fetchData = async() => {
    const querySnapshot = await getDocs(collection(db, name));
    const arr = []
    querySnapshot.forEach((doc) => {

      arr.push(doc.data())
    });
    setProducts(arr)
  }

  useEffect(() => {
    fetchData();
  }, [name])

  if (products.length === 0) {
    return ''
  }

  return (
    <div>
      < NavBar />
      <Link to={`/${ name }/AddItemForm`}>
        <button >Add Item</button>
      </Link>
      <h1>{ name }</h1>
      <p>Items List</p>
      {}
        {products.map((product, i) => {
          return <div key={i}>
                <h5>{product.name}</h5>
                <img src={product.imageUrl} alt={product.name} />
                <p>Nutrition facts:</p>
                <ul>
                  <li>Calories: {product.nutritionFacts?.calories}</li>
                  <li>Protein: {product.nutritionFacts?.protein} g</li>
                  <li>Fat: {product.nutritionFacts?.fat} g</li>
                  <li>Carbohydrates: {product.nutritionFacts?.carbohydrates} g</li>
                  <li>Nutrition Grade: {product?.nutritionScore}</li>
                </ul>
           </div>     
        })}
    </div>
  )
}
