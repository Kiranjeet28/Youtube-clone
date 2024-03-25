import React, { useState, useEffect } from 'react';
import Homelayout from './Homelayout'; // Import Homelayout component
import {LoadingCato} from '../LoadingPage/LoadingComponents'
import { ApiKey } from '../../Api';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${ApiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const clickHandler = (category) => {
    setSelectedCategory(category);
  };

  return (
    
    <div >
      {loading ? (<LoadingCato/>)
     : (
      <div className=' w-[90vw] overflow-hidden scrollbar-hide '>
        <ul id="cato"  className='flex flex-row m-4 overflow-x-auto scroll-smooth cursor-pointer scrollbar-hide whitespace-nowrap'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} onClick={() => clickHandler(category)}
              className=' h-7 w-max mr-1 ml-1 bg-gray-200 rounded-md flex items-center justify-center p-2  hover:bg-gray-300 '>
                <p className='w-max'>{category.snippet.title}</p>
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </div>
      )
  }
      <Homelayout category={selectedCategory ? selectedCategory.id : null} />
    </div>
  );
};

export default Category;
