// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import NavBar from '../NavBar';

// function Items(props) {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);

//   const params = useParams() 
//   console.log(params.name)

//   useEffect(() => {
//     // Fetch products from API only when the component is mounted for the first time
//     if (!isMounted) {
//       fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_countries=&json=1`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Unable to fetch products from API');
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.products.length === 0) {
//             throw new Error('No products found for selected category and country');
//           }
//           setProducts(data.products);
//         })
//         .catch(error => {
//           setError(error.message);
//         });

//       setIsMounted(true);
//     }
//   }, [isMounted]);

//   if (error) {
//     return <div>{error}</div>;
//   }

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
//         <button>Add Item</button>
//       </Link>
//     </div>
//   );
// }

// export default Items;






import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'

const Items = () => {
  const [items, setItems] = useState([])

  const params = useParams() 
  console.log(params.name)

  const fetchData = async() => {
    const querySnapshot = await getDocs(collection(db, params.name));
    const arr = []
    querySnapshot.forEach((doc) => {
        arr.push(doc.data())
    });
    setItems(arr)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <NavBar />
      {items.map((item, i) => {{console.log(items)}
          return <p key={i}>{item.name}</p>
      })}
    </div>
    
  )
}

export default Items