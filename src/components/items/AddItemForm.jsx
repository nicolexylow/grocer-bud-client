import React, { useState } from 'react';
import NavBar from '../NavBar';
// import { storage } from 'firebase/app';
// import 'firebase/storage';

// const AddItemForm = ({ onAddItem }) => {
//   const [productName, setProductName] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleProductNameChange = (event) => {
//     setProductName(event.target.value);
//   };

//   const handleExpiryDateChange = (event) => {
//     setExpiryDate(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

// const storageRef = storage().ref(); // Initialize storageRef with a reference to Firebase Storage

const handleSubmit = (event) => {
  event.preventDefault();

//   // If an error has already occurred or the request is loading, don't make another request
//   if (error || loading) {
//     return;
//   }

//   // Start loading
//   setLoading(true);

  // Upload image to Firebase Storage if storageRef is defined
  // let uploadTask;
  // if (storageRef && image) {
  //   uploadTask = storageRef.child(image.name).put(image);
  // }

  // Fetch nutrition information
  const query = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&page_size=1&json=true`;
  fetch(query)
    .then(response => response.json())
    .then(data => {
      // Get nutrition information and score for the first product
      const product = data.products[0];
      const nutritionFacts = {
        calories: product.nutriments.energy_value,
        protein: product.nutriments.proteins_value,
        fat: product.nutriments.fat_value,
        carbohydrates: product.nutriments.carbohydrates_value,
      };
      console.log(nutritionFacts)
      const nutritionScore = product.nutrition_grade_fr;
      console.log(nutritionScore)
    })
      // If there is an upload task, get the download URL and pass it to onAddItem
      // if (uploadTask) {
      //   uploadTask.snapshot.ref.getDownloadURL()
      //     .then(imageUrl => {
      //       if (onAddItem) {
      //         onAddItem({
      //           name: productName,
      //           expiryDate,
      //           image: imageUrl,
      //           nutritionFacts,
      //           nutritionScore,
      //         });
      //       }
      //     })
      //     .catch(error => {
      //       console.error('Error adding item:', error);
      //       setError(true); // Set error state to true
      //     })
      //     .finally(() => {
      //       setLoading(false); // Stop loading
      //     });
      // } else {
      //   // Pass the new item to the onAddItem callback function
      //   if (onAddItem) {
      //     onAddItem({
      //       name: productName,
      //       expiryDate,
      //       image: null,
      //       nutritionFacts,
      //       nutritionScore,
      //     });
      //   }
      //   setLoading(false); // Stop loading
      // }
      // Pass the new item to the onAddItem callback function
      if (onAddItem) {
        onAddItem({
          name: productName,
          expiryDate,
          image: null,
          nutritionFacts,
          nutritionScore,
        });
      }
      setLoading(false); // Stop loading

//       setError(false); // Reset error state on successful request
//     })
//     .catch(error => {
//       console.error('Error adding item:', error);
//       setError(true); // Set error state to true
//       setLoading(false); // Stop loading
//     });
// };

  return (
    <div>
      <NavBar />
      <h2>Add Item</h2>
      {error ? (
        <p>There was an error adding the item. Please try again later.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Product name:
            <input type="text" value={productName} onChange={handleProductNameChange} />
          </label>
          <br />
          <label>
            Expiry date:
            <input type="date" value={expiryDate} onChange={handleExpiryDateChange} />
          </label>
          <br />
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          <button type="submit">Add item</button>
        </form>
      )}
    </div>
  );
};
export default AddItemForm;
