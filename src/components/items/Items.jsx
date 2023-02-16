import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase'
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore"; 
import { useParams } from 'react-router-dom';

export const Items = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

const fetchData = async() => {
  const querySnapshot = await getDocs(collection(db, name));
  const arr = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    arr.push(data)
  });
  setProducts(arr)
}


useEffect(() => {
  fetchData();
}, [name])

const deleteData = async (itemId) => {
  await deleteDoc(doc(db, name, itemId))
}

const handleDelete = (itemId) => {
    deleteData(itemId)
    fetchData()
}

if (products.length === 0 ) {
  return ''
}

  return (
    <div>
      < NavBar />
      <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '20px'}}>{ name.charAt(0).toUpperCase() + name.slice((name.length - 1) * -1) }</h1>
      
      <Link to={`/${ name }/AddItemForm`}>
        <button className='btn btn-success btn-sm mb-4' style={{backgroundColor: '#60954E'}}>Add Item</button>
      </Link>
      <p></p>
      {}
      {products.filter(product => product.name).map((product, i) =>{

          const expiryDateString = product.expiryDate;
          const currentDate = new Date();
          const expiryDate = new Date(expiryDateString);
          const timeDiff = expiryDate.getTime() - currentDate.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          let daysDiffText = '';
          let color = ''
          if (daysDiff < 0) {
            daysDiffText = 'is expired';
            color = '#FEAEAE'
          } else if (daysDiff === 0) {
            daysDiffText = 'expires today';
            color = '#FEE093'
          } else if (daysDiff === 1) {
            daysDiffText = 'expires in 1 day';
            color = '#FEE093'
          } else if (daysDiff > 5) {
            color = '#B5F0AB'
            daysDiffText = `expires in ${daysDiff} days`;
          } else {
            color = '#FEE093'
            daysDiffText = `expires in ${daysDiff} days`;
          }
          return <div className='d-flex justify-content-center'>
          <div key={i} className='mb-4' style={{backgroundColor: '#A6D48F', width: '50%', borderRadius: '10px'}}>
              <div className='d-flex justify-content-between align-items-center mb-3 px-5'>
              <span className='my-3 mb-4' style={{fontSize: '22px', fontWeight: 'bold'}}>{product.name}</span>
                <span style={{backgroundColor: `${color}`, padding:'5px', borderRadius: '5px'}}>{` This item ${daysDiffText}.`}</span>
              </div>
                
                <div className='d-flex justify-content-around'>
                  <img src={product.imageUrl} alt={product.name} className='mb-4' style={{objectFit: 'cover', borderRadius: '6px', border: '1px solid black', width: '30%', height: '150px' }}/>

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
                
                <button className='btn btn-success btn-sm mt-2 mb-3' style={{backgroundColor: '#60954E'}} onClick={() => handleDelete(product.id)}>Delete</button>
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



