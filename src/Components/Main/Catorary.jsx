import React, { useState, useEffect } from 'react';
import Homelayout from './Homelayout'; // Import Homelayout component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=AIzaSyBodI_aQueIY74F0G6BeaMs1qvjL_8naAs`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const clickHandler = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>YouTube Video Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} onClick={() => clickHandler(category)}>
              <p>{category.snippet.title}</p>
            </li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
      <Homelayout category={selectedCategory ? selectedCategory.id : null} />
    </div>
  );
};

export default Category;
