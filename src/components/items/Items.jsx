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
          <div key={i} className='mb-4' style={{backgroundColor: '#A6D48F', width: '40%', borderRadius: '10px'}}>
                <h2 className='my-3 mb-4' style={{fontSize: '20px'}}>{product.name}</h2>

                <div className='d-flex justify-content-around'>
                  <img src={product.imageUrl} alt={product.name} width={180} className='mb-4' style={{objectFit: 'cover'}}/>

                  <div>
                    <h3 style={{fontSize: '16px', fontWeight: '600'}}>Nutrition facts</h3>
                    <ul style={{padding: '0', textAlign: 'left'}}>
                      <li style={{listStyle: 'none'}}>Calories: {product.nutritionFacts?.calories}</li>
                      <li style={{listStyle: 'none'}}>Protein: {product.nutritionFacts?.protein} g</li>
                      <li style={{listStyle: 'none'}}>Fat: {product.nutritionFacts?.fat} g</li>
                      <li style={{listStyle: 'none'}}>Carbohydrates: {product.nutritionFacts?.carbohydrates} g</li>
                      <li style={{listStyle: 'none'}}>Nutrition Grade: {product?.nutritionScore}</li>
                    </ul>
                  </div>
                </div>
                
                
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



