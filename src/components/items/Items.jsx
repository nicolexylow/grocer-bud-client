import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase'
import { collection, getDocs } from "firebase/firestore"; 
import { useParams } from 'react-router-dom';

export const Items = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState(null);
  // const [itemAdded, setItemAdded] = useState(false);

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

  // if (error) {
  //   return <div>{error}</div>;
  // }

  get_collection_name()
  
  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;
  return (
    <div>
      < NavBar />
      <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '20px'}}>{ name.charAt(0).toUpperCase() + name.slice((name.length - 1) * -1) }</h1>
      <Link to="/AddItemForm">
        <button className='btn btn-success btn-sm mb-5' style={{backgroundColor: '#60954E'}}>Add Item</button>
      </Link>
      
      {}
        {products.map((product, i) => {
          return <div className='d-flex justify-content-center'>
          <div key={i} className='mb-4' style={{backgroundColor: '#A6D48F', width: '60%', borderRadius: '10px'}}>
                <h5>{product.name}</h5>
                <img src={product.imageUrl} alt={product.name} />
                <h6>{product.expiryDate}</h6>
                <h6>{currentDate}</h6>
                <p>Nutrition facts:</p>
                <ul>
                  <li>Calories: {product.nutritionFacts?.calories}</li>
                  <li>Protein: {product.nutritionFacts?.protein} g</li>
                  <li>Fat: {product.nutritionFacts?.fat} g</li>
                  <li>Carbohydrates: {product.nutritionFacts?.carbohydrates} g</li>
                  <li>Nutrition Grade: {product?.nutritionScore}</li>
                </ul>
           </div>  
           </div>   
        })}
    </div>
  )
      }

function get_collection_name() {
  let str = window.location.pathname
    str = str.split("/");
    const collection_name = str[str.length - 1];
    return collection_name
}
const collectionName = get_collection_name();

export { collectionName } 

