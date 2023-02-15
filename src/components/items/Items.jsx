// The MOST IMPORTNAT

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import NavBar from "../NavBar";

const Items = ({ collectionName }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
    };
    getItems();
  }, [collectionName]);

  return (
    <div>
      <NavBar />
      <h1>{collectionName}</h1>
      {items.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Image: {item.imageUrl}</p>
          <p>Expiry Date: {item.expiryDate}</p>
          <p>Nutrition Information: {item.nutritionFacts}</p>
          <p>Nutrition Score: {item.nutritionScore}</p>
        </div>
      ))}
    </div>
  );
};

export default Items;


// Ignore this cause it doesn't work

  // const Card = ({ item }) => {
  //   return (
  //     <div className="col-sm-4 mb-4">
  //       <div className="card">
  //         <img className="card-img-top" src={item.imageUrl} alt={item.name} />
  //         <div className="card-body">
  //           <h5 className="card-title">{item.name}</h5>
  //           <p className="card-text">Expires on: {item.expiryDate}</p>
  //           <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
  //             Delete
  //           </button>
  //           <button className="btn btn-primary" onClick={handleNutritionClick}>
  //             {showNutrition ? "Hide Nutrition" : "Show Nutrition"}
  //           </button>
  //           {showNutrition && (
  //             <div className="card-text">
  //               <p>Calories: {item.nutritionFacts?.calories}</p>
  //               <p>Protein: {item.nutritionFacts?.protein}</p>
  //               <p>Fat: {item.nutritionFacts?.fat}</p>
  //               <p>Carbohydrates: {item.nutritionFacts?.carbohydrates}</p>
  //             </div>
  //           )}
  //           <button className="btn btn-primary" onClick={() => navigate(`/edit-item/${item.id}`)}>
  //             Edit
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

//   return (
//     <>
//       <NavBar />
//       <div className="container">
//         <div className="row">
//           {items.map((item) => (
//             <Card key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//     </>
//   );