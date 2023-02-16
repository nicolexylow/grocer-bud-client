import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase'
import { collection, getDocs, query } from "firebase/firestore"; 
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

if (products.length === 0 ) {
  return ''
}

  return (
    <div>
      < NavBar />
      <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '20px'}}>{ name.charAt(0).toUpperCase() + name.slice((name.length - 1) * -1) }</h1>
      <Link to={`/${ name }/AddItemForm`}>
        <button className='btn btn-success btn-sm mb-5' style={{backgroundColor: '#60954E'}}>Add Item</button>
      </Link>
      <p></p>
      {}
      {products.filter(product => product.name).map((product, i) =>{
          const expiryDateString = product.expiryDate;
          const currentDate = new Date();
          const expiryDate = new Date(expiryDateString);
          const timeDiff = expiryDate.getTime() - currentDate.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return <div className='d-flex justify-content-center'>
          <div key={i} className='mb-4' style={{backgroundColor: '#A6D48F', width: '50%', borderRadius: '10px'}}>
                <h5>{product.name}</h5>
                <img src={product.imageUrl} alt={product.name}  class="rounded" width="200" height="200"/>
                <h6>{` This item expires in ${daysDiff} days.`}</h6>
                <p>Nutrition facts:</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" style={{backgroundColor: '#A6D48F'}}>Calories: {product.nutritionFacts?.calories}</li>
                  <li class="list-group-item" style={{backgroundColor: '#A6D47F'}}>Protein: {product.nutritionFacts?.protein} g</li>
                  <li class="list-group-item" style={{backgroundColor: '#A6D46F'}}>Fat: {product.nutritionFacts?.fat} g</li>
                  <li class="list-group-item" style={{backgroundColor: '#A6D45F'}}>Carbohydrates: {product.nutritionFacts?.carbohydrates} g</li>
                  <li class="list-group-item" style={{backgroundColor: '#A6D34F'}}>Nutrition Grade: {product?.nutritionScore}</li>
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



