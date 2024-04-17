// Catagories.js

import React, { useState, useEffect, useContext } from 'react';
import './Catagories.css';
import { ProductContext } from '../../contexts/ProductContext';

function Catagories({ClickOnCat,setClickOnCat}) {
  const { setProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const fetchData = async (index) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${categories[index]}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (ClickOnCat !== false) {
      fetchData(ClickOnCat);
    }
  }, [ClickOnCat]);

  return (
    <div className='catagories'>
      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => {
            setClickOnCat(index);
           
          }}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catagories;
