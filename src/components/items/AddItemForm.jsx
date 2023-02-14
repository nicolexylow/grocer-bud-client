import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AddItemForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload image to Firebase Storage
    if (image !== null) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    }

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

        // Save item to Firebase Firestore
        const docRef = await addDoc(collection(db, "items"), {
          name: productName,
          imageUrl: imageUrl,
          expiryDate: expiryDate,
          nutritionFacts: nutritionFacts,
          nutritionScore: nutritionScore,
        });

        // Navigate to items list
        navigate("/items");
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
      });
  };

  const handleCancel = () => {
    navigate("/items");
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
            type="file"
            id="image-upload"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        <div>
          <button type="submit">Add Item</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
