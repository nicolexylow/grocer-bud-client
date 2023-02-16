import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, storage, storageRef } from "../../config/firebase";
import { collectionName } from "./Items";

const AddItemForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState("");
  const { name } = useParams();
  console.log('NAME', name)
  // const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.value;
    setImage(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch nutrition information

    const query = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&page_size=1&json=true`;
    fetch(query)
      .then((response) => response.json())
      .then(async (data) => {
        // Get nutrition information and score for the first product
        const product = data.products[0];
        const nutritionFacts = {
          calories: product.nutriments.energy_value,
          protein: product.nutriments.proteins_value,
          fat: product.nutriments.fat_value,
          carbohydrates: product.nutriments.carbohydrates_value,
        };
        const nutritionScore = product.nutrition_grade_fr;

        console.log(nutritionFacts);
        console.log(nutritionScore);

        const sendData = async () => {
    
          const docRef = await addDoc(collection(db, collectionName), {
            name: productName,
            imageUrl: image,
            expiryDate: expiryDate,
            nutritionFacts: nutritionFacts,
            nutritionScore: nutritionScore,
          });
        };

        sendData();
        // Navigate to items list
        navigate(`/categories`);
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
      });
  };

  const handleCancel = () => {
    navigate(`/categories`);
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expiry-date">Expiry Date</label>
          <input
            type="date"
            id="expiry-date"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image-upload">Image Upload</label>
          <input
            type="text"
            id="image-upload"
            onChange={handleImageUpload}
            value={image}
          />
        </div>
        <div>
          {/* <Link to={`/categories/${ name }`}> */}
          <button type="submit">Add Item</button>
          {/* </Link> */}
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;




