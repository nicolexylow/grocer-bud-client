import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import { db } from '../../config/firebase'
import { collection, doc, setDoc, addDoc, getDocs, docRef } from "firebase/firestore"; 

export const Items = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [itemAdded, setItemAdded] = useState(false);
  //const [isLoading, setLoading] = useState(true);

  const fetchData = async() => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const arr = []
    querySnapshot.forEach((doc) => {

      arr.push(doc.data())
    });
    setProducts(arr)
  }
  // fetchData();
  // if (itemAdded) {
  useEffect(() => {
    fetchData();
  }, [])
//}
  
// if(isLoading) {
//   return <div className='App'>Loading...</div>
// }

  if (products.length === 0) {
    return ''
  }

  return (
    <div>
      <p>hello</p>
      {/* {console.log(collectionName)} */}
        {products.map((product, i) => {
          // {console.log(product)}
          // return <Link to={`/categories/${product.code}`}>
          return <div key={i}>
                <h2>{product.name}</h2>
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
      <Link to="/AddItemForm">
        <button >Add Item</button>
        </Link>
    </div>
  )
      }
//}
  //   // Fetch products from API only when an item has been added
  //   if (itemAdded) {
  //     fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_countries=&json=1`)
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Unable to fetch products from API');
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         if (data.products.length === 0) {
  //           throw new Error('No products found for selected category');
  //         }
  //         setProducts(data.products);
  //       })
  //       .catch(error => {
  //         setError(error.message);
  //       });
  //   }
  // }, [itemAdded]);

//   const handleItemAdded = () => {
//     setItemAdded(true);
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   get_collection_name()

//   return (
//     <div>
//       <NavBar />
//       <h1>Items Page</h1>
//       {products.length > 0 ? (
//         <ul>
//           {products.map((product) => (
//             <li key={product.code}>
//               <Link to={`/item/${product.code}`}>
//                 <h2>{product.product_name}</h2>
//                 <img src={product.image_front_url} alt={product.product_name} />
//                 <p>Nutrition facts:</p>
//                 <ul>
//                   <li>Calories: {product.nutriments.energy_value}</li>
//                   <li>Protein: {product.nutriments.proteins_value} g</li>
//                   <li>Fat: {product.nutriments.fat_value} g</li>
//                   <li>Carbohydrates: {product.nutriments.carbohydrates_value} g</li>
//                   <li>Nutrition Grade: {product.nutrition_grade_fr}</li>
//                 </ul>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No items found. Please add a new item.</div>
//       )}
//       <Link to="/AddItemForm">
//         <button onClick={handleItemAdded}>Add Item</button>
//       </Link>
//     </div>
//   );
// }

function get_collection_name() {
  let str = window.location.pathname
    str = str.split("/");
    const collection_name = str[str.length - 1];
    return collection_name
}
const collectionName = get_collection_name();

export { collectionName } 

