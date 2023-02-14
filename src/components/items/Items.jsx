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
}

// function Items() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [itemAdded, setItemAdded] = useState(false);

//   useEffect(() => {
//     // Fetch products from API only when an item has been added
//     if (itemAdded) {
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
//     }
//   }, [itemAdded]);

//   const handleItemAdded = () => {
//     setItemAdded(true);
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <NavBar />
//       {items.map((item, i) => {{console.log(items)}
//           return <p key={i}>{item.name}</p>
//       })}
      
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
    
//   )
// }

export default Items;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import NavBar from '../NavBar';
// import { db } from '../../config/firebase';
// import { collection, addDoc } from "firebase/firestore"; 

// function Items() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Initialize Firebase with your project credentials
//     firebase.initializeApp({
//       // your Firebase project credentials
//     });

//     // Create a reference to the Firebase collection that stores items
//     // const itemsRef = firebase.firestore().collection('breakfast foods');
//     const itemsRef =  getDocs(collection(db, "breakfast foods"));
//     // Listen for changes to the items in the collection
//     const unsubscribe = itemsRef.onSnapshot((snapshot) => {
//       const newProducts = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(newProducts);
//     });

//     // Unsubscribe from the listener when the component unmounts
//     return unsubscribe;
//   }, []);

//   const handleItemAdded = () => {
//     // Create a new item and add it to the Firebase collection
//     firebase.firestore().collection('breakfast foods').add({
//       // the data for the new item
//     });
//   };

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
//             <li key={product.id}>
//               <Link to={`/item/${product.id}`}>
//                 <h2>{product.product_name}</h2>
//                 <img src={product.image_url} alt={product.product_name} />
//                 <p>Nutrition facts:</p>
//                 <ul>
//                   <li>Calories: {product.calories}</li>
//                   <li>Protein: {product.protein} g</li>
//                   <li>Fat: {product.fat} g</li>
//                   <li>Carbohydrates: {product.carbohydrates} g</li>
//                   <li>Nutrition Grade: {product.nutrition_grade}</li>
//                 </ul>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No items found. Please add a new item.</div>
//       )}
//       <button onClick={handleItemAdded}>Add Item</button>
//     </div>
//   );
// }

// export default Items;
