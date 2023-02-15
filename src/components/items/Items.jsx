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

// import { useState, useEffect } from "react";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../contexts/AuthContext";

// const Items = ({ /*categories*/ }) => {
//   const { currentUser } = useAuth();
//   const [items, setItems] = useState([]);
//   // useState set Categories
//   const [showNutrition, setShowNutrition] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItems = async () => {
//       if (currentUser) {
//         const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/items`));
//         const fetchedItems = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setItems(fetchedItems);
//       }
//     };
//     fetchItems();
//   }, [currentUser]);

//   // make one like the above for categories

//   const handleDelete = async (itemId) => {
//     try {
//       await deleteDoc(doc(db, `users/${currentUser.uid}/items`, itemId));
//       setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleNutritionClick = () => {
//     setShowNutrition((prevShowNutrition) => !prevShowNutrition);
//   };
//   // console.log(categories);
//   // const categoryObj = {};
//   // categories.forEach((category) => {
//   //   categoryObj[category.id] = category.name;
//   // });

//   // useEffect(() => {
//   //   if (categories.length && items.length) {
//   //     const currentCategoryId = items[0]?.categoryId;
//   //     const currentCategory = categoryObj[currentCategoryId] || "";
//   //     setCurrentCategory(currentCategory);
//   //   }
//   // }, [categories, items, categoryObj]);

//   const Card = ({ item }) => {
//     return (
//       <div className="col-sm-4 mb-4">
//         <div className="card">
//           <img className="card-img-top" src={item.imageUrl} alt={item.name} />
//           <div className="card-body">
//             <h5 className="card-title">{item.name}</h5>
//             <p className="card-text">Expires on: {item.expiryDate}</p>
//             {/* <p className="card-text">Category: {categoryObj[item.categoryId]}</p> */}
//             <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
//               Delete
//             </button>
//             <button className="btn btn-primary" onClick={handleNutritionClick}>
//               {showNutrition ? "Hide Nutrition" : "Show Nutrition"}
//             </button>
//             {showNutrition && (
//               <div className="card-text">
//                 <p>Calories: {item.nutritionFacts?.calories}</p>
//                 <p>Protein: {item.nutritionFacts?.protein}</p>
//                 <p>Fat: {item.nutritionFacts?.fat}</p>
//                 <p>Carbohydrates: {item.nutritionFacts?.carbohydrates}</p>
//               </div>
//             )}
//             <button className="btn btn-primary" onClick={() => navigate(`/edit-item/${item.id}`)}>
//               Edit
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
// }
// export default Items;

