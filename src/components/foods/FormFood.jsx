import React, { useState } from 'react';

const FormFood = ({ onSearch }) => {
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [keyword, setKeyword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // If an error has already occurred or the request is loading, don't make another request
    if (error || loading) {
      return;
    }

    const query = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${keyword}&search_categories=${category}&search_countries=${country}&page_size=1&json=true`;

    // Start loading
    setLoading(true);

    // Search for products
    fetch(query)
      .then(response => response.json())
      .then(data => {
        // Pass the first product to the onSearch callback function if it exists
        if (onSearch) {
          onSearch(data.products[0]);
        }
        setError(false); // Reset error state on successful request
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
        setError(true); // Set error state to true
        setLoading(false); // Stop loading
      });
  };

  return (
    <div>
      {error ? (
        <p>There was an error fetching data from the API. Please try again later.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Search keyword:
            <input type="text" value={keyword} onChange={handleKeywordChange} />
          </label>
          <label>
            Category:
            <select value={category} onChange={handleCategoryChange}>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="meat">Meat</option>
              <option value="dairy">Dairy</option>
            </select>
          </label>
          <label>
            Country:
            <select value={country} onChange={handleCountryChange}>
              <option value="world">World</option>
              <option value="united-states">United States</option>
              <option value="australia">Australia</option>
              <option value="france">France</option>
              <option value="italy">Italy</option>
            </select>
          </label>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <button type="submit" disabled={loading}>Search</button>
          {loading && <p>Loading...</p>}
        </form>
      )}
    </div>
  );
};

export default FormFood;
